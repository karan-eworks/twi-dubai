"use client";

import { useMemo, useState } from "react";
import { type Resolver, Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/shared/ButtonLink";
import { Recaptcha } from "@/components/apply/recaptcha";
import type {
  ApplyFieldDescriptor,
  ApplyFieldOption,
  ApplyFormConfig,
} from "@/data/format-data/apply-form";

type ApplyValues = Record<string, string>;

const AUTOCOMPLETE: Record<string, string> = {
  first_name: "given-name",
  last_name: "family-name",
  email: "email",
  phone_number: "tel",
};

function buildSchema(fields: ApplyFieldDescriptor[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    if (field.type === "captcha") continue;

    let rule: z.ZodTypeAny;
    switch (field.type) {
      case "email":
        rule = z
          .string()
          .trim()
          .min(1, "Enter your email address.")
          .email("Enter a valid email address.");
        break;
      case "phone":
        rule = z
          .string()
          .refine(
            (value) => isValidPhoneNumber(value),
            "Enter a valid phone number, including country code.",
          );
        break;
      case "textarea":
        rule = z
          .string()
          .trim()
          .min(20, "Tell us a little more — 20 characters minimum.")
          .max(3000, "Please keep this under 3000 characters.");
        break;
      case "select":
      case "course":
        rule = z.string().min(1, `Choose your ${field.label.toLowerCase()}.`);
        break;
      default:
        rule = z
          .string()
          .trim()
          .min(2, `Enter your ${field.label.toLowerCase()}.`);
    }

    shape[field.slug] = field.required ? rule : rule.optional();
  }

  return z.object(shape);
}

function optionsFor(
  field: ApplyFieldDescriptor,
  courseOptions: ApplyFieldOption[],
): ApplyFieldOption[] {
  return field.type === "course" ? courseOptions : field.options;
}

export function ApplyForm({
  config,
  courseOptions,
}: {
  config: ApplyFormConfig;
  courseOptions: ApplyFieldOption[];
}) {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const fields = useMemo(
    () => config.fields.filter((field) => field.type !== "captcha"),
    [config.fields],
  );
  const schema = useMemo(() => buildSchema(config.fields), [config.fields]);

  const defaultValues = useMemo(
    () =>
      fields.reduce<ApplyValues>(
        (values, field) => {
          values[field.slug] = "";
          return values;
        },
        {},
      ),
    [fields],
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ApplyValues>({
    resolver: zodResolver(
      schema as unknown as Parameters<typeof zodResolver>[0],
    ) as unknown as Resolver<ApplyValues>,
    defaultValues,
  });

  async function onSubmit(values: ApplyValues) {
    if (config.hasCaptcha && !captchaToken) {
      setCaptchaError("Please complete the CAPTCHA to continue.");
      return;
    }
    setCaptchaError("");
    setStatus("idle");

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gRecaptchaToken: captchaToken,
          fields: values,
        }),
      });

      const body = (await response.json().catch(() => null)) as
        | { errors?: Record<string, string[]>; message?: string }
        | null;

      if (!response.ok) {
        const upstreamErrors = body?.errors;
        let surfaced = false;
        if (upstreamErrors) {
          for (const [key, messages] of Object.entries(upstreamErrors)) {
            const slug = key.replace(/^attribute-/, "");
            const message = Array.isArray(messages) ? messages[0] : undefined;
            if (!message) continue;
            if (slug === "g-recaptcha-response") {
              setCaptchaError(message);
            } else {
              setError(slug, { type: "server", message });
            }
            surfaced = true;
          }
        }
        if (!surfaced) {
          throw new Error("Request failed");
        }
        setStatus("error");
        return;
      }

      reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-md border border-border bg-stone-50 p-8 sm:p-10">
        <span className="grid size-11 place-items-center rounded-full bg-navy-500 text-white">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-heading text-2xl leading-tight text-foreground">
          Application received
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Your details are with the admissions team. Expect a counselling call
          within one working day to confirm eligibility, fees, and next steps.
        </p>
        <Button
          type="button"
          className="mt-5"
          onClick={() => setStatus("idle")}
        >
          Submit another application
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const errorMessage = errors[field.slug]?.message as string | undefined;
          const invalid = Boolean(errorMessage);
          const autoComplete = AUTOCOMPLETE[field.slug];
          const options = optionsFor(field, courseOptions);

          return (
            <div
              key={field.slug}
              className={field.half ? "" : "sm:col-span-2"}
            >
              <Field data-invalid={invalid}>
                <FieldLabel htmlFor={field.slug}>{field.label}</FieldLabel>

                {field.type === "select" || field.type === "course" ? (
                  <Controller
                    control={control}
                    name={field.slug}
                    render={({ field: rhfField }) => (
                      <Select
                        value={rhfField.value || null}
                        onValueChange={rhfField.onChange}
                      >
                        <SelectTrigger
                          id={field.slug}
                          aria-invalid={invalid}
                          className="h-11 w-full rounded-sm"
                        >
                          <SelectValue
                            placeholder={`Choose ${field.label.toLowerCase()}`}
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-sm">
                          {options.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="cursor-pointer"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                ) : field.type === "phone" ? (
                  <Controller
                    control={control}
                    name={field.slug}
                    render={({ field: rhfField }) => (
                      <PhoneInput
                        id={field.slug}
                        aria-invalid={invalid}
                        value={rhfField.value}
                        onChange={rhfField.onChange}
                      />
                    )}
                  />
                ) : field.type === "textarea" ? (
                  <Textarea
                    id={field.slug}
                    rows={6}
                    maxLength={3000}
                    placeholder="Tell us which programme you are considering and where you are applying from."
                    aria-invalid={invalid}
                    className="min-h-36 rounded-sm"
                    {...register(field.slug)}
                  />
                ) : (
                  <Input
                    id={field.slug}
                    type={field.type === "email" ? "email" : "text"}
                    inputMode={field.type === "email" ? "email" : undefined}
                    autoComplete={autoComplete}
                    aria-invalid={invalid}
                    className="h-11 rounded-sm"
                    {...register(field.slug)}
                  />
                )}

                {field.type === "phone" ? (
                  <FieldDescription>
                    Include your country code — we may use this for a call or
                    WhatsApp.
                  </FieldDescription>
                ) : null}

                <FieldError>{errorMessage}</FieldError>
              </Field>
            </div>
          );
        })}
      </div>

      {config.hasCaptcha ? (
        <div className="mt-6">
          <Recaptcha
            siteKey={
              config.recaptchaSiteKey ??
              (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string) ??
              ""
            }
            onToken={(token) => {
              setCaptchaToken(token);
              if (token) setCaptchaError("");
            }}
          />
          {captchaError ? (
            <p role="alert" className="mt-2 text-sm leading-6 text-destructive">
              {captchaError}
            </p>
          ) : null}
        </div>
      ) : null}

      {status === "error" ? (
        <p role="alert" className="mt-6 text-sm leading-6 text-destructive">
          Something went wrong submitting your application. Please check the
          fields above and try again, or email admissions directly.
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="min-w-44"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Submitting
            </>
          ) : (
            <>
              {config.buttonLabel}
              <ArrowRight aria-hidden="true" />
            </>
          )}
        </Button>

        <p className="datum text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          No obligation — an advisor replies within one working day
        </p>
      </div>
    </form>
  );
}