"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

const ENQUIRY_TOPICS = [
  { value: "admissions", label: "Admissions and entry requirements" },
  { value: "fees", label: "Fees, payment plans, and scholarships" },
  { value: "programmes", label: "Programmes and progression routes" },
  { value: "accommodation", label: "Accommodation and student life" },
  { value: "partnerships", label: "Agent or school partnership" },
  { value: "other", label: "Something else" },
] as const;

const MESSAGE_MAX = 2000;

const contactSchema = z.object({
  firstName: z.string().trim().min(2, "Enter your first name."),
  lastName: z.string().trim().min(2, "Enter your last name."),
  email: z.string().trim().email("Enter a valid email address."),
  // Optional, but validated when present. Deliberately permissive:
  // international formats vary more than most regexes allow for.
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^\+?[\d\s()-]{7,20}$/.test(value),
      "Enter a valid phone number, including country code.",
    ),
  topic: z.string().min(1, "Choose what your enquiry is about."),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more — 20 characters minimum.")
    .max(MESSAGE_MAX, `Please keep this under ${MESSAGE_MAX} characters.`),
  consent: z.literal(true, {
    message: "Please agree before sending.",
  }),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      topic: "",
      message: "",
      consent: false as unknown as true,
    },
  });

  const messageLength = watch("message")?.length ?? 0;

  async function onSubmit(values: ContactValues) {
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Request failed");

      reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-md border border-border bg-stone-50 p-8">
        <span className="grid size-11 place-items-center rounded-full bg-navy-500 text-white">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-heading text-2xl leading-tight text-foreground">
          Message received
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Admissions replies within one working day. If it is urgent, WhatsApp
          is faster.
        </p>
        <Button
          type="button"
          className="mt-5"
          onClick={() => setStatus("idle")}
        >
          Send another message
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="datum text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Your details
          </FieldLegend>

          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={Boolean(errors.firstName)}>
              <FieldLabel htmlFor="firstName">First name</FieldLabel>
              <Input
                id="firstName"
                autoComplete="given-name"
                aria-invalid={Boolean(errors.firstName)}
                className="rounded-sm"
                {...register("firstName")}
              />
              <FieldError>{errors.firstName?.message}</FieldError>
            </Field>

            <Field data-invalid={Boolean(errors.lastName)}>
              <FieldLabel htmlFor="lastName">Last name</FieldLabel>
              <Input
                id="lastName"
                autoComplete="family-name"
                aria-invalid={Boolean(errors.lastName)}
                className="rounded-sm"
                {...register("lastName")}
              />
              <FieldError>{errors.lastName?.message}</FieldError>
            </Field>

            <Field data-invalid={Boolean(errors.email)}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                className="rounded-sm"
                {...register("email")}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>

            <Field data-invalid={Boolean(errors.phone)}>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+971 52 898 3382"
                aria-invalid={Boolean(errors.phone)}
                className="rounded-sm"
                {...register("phone")}
              />
              <FieldDescription>
                Optional, but speeds up a reply.
              </FieldDescription>
              <FieldError>{errors.phone?.message}</FieldError>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend className="datum text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Your enquiry
          </FieldLegend>

          <FieldGroup>
            <Field data-invalid={Boolean(errors.topic)}>
              <FieldLabel htmlFor="topic">What is it about?</FieldLabel>
              <Controller
                control={control}
                name="topic"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="topic"
                      aria-invalid={Boolean(errors.topic)}
                      className="h-11 w-full rounded-sm"
                    >
                      <SelectValue placeholder="Choose a topic" />
                    </SelectTrigger>
                    <SelectContent className="rounded-sm">
                      {ENQUIRY_TOPICS.map((topic) => (
                        <SelectItem
                          key={topic.value}
                          value={topic.value}
                          className="cursor-pointer"
                        >
                          {topic.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError>{errors.topic?.message}</FieldError>
            </Field>

            <Field data-invalid={Boolean(errors.message)}>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea
                id="message"
                rows={6}
                maxLength={MESSAGE_MAX}
                placeholder="Tell us which programme you are considering and where you are applying from."
                aria-invalid={Boolean(errors.message)}
                className="rounded-sm"
                {...register("message")}
              />
              <FieldDescription className="datum text-[11px] uppercase tracking-[0.12em]">
                {messageLength} / {MESSAGE_MAX}
              </FieldDescription>
              <FieldError>{errors.message?.message}</FieldError>
            </Field>

            <Field
              orientation="horizontal"
              data-invalid={Boolean(errors.consent)}
            >
              <Controller
                control={control}
                name="consent"
                render={({ field }) => (
                  <Checkbox
                    id="consent"
                    checked={field.value === true}
                    onCheckedChange={field.onChange}
                    aria-invalid={Boolean(errors.consent)}
                    className="mt-0.5 rounded-[2px]"
                  />
                )}
              />
              <FieldLabel
                htmlFor="consent"
                className="text-sm font-normal leading-6 text-muted-foreground"
              >
                I agree that TWI Dubai may contact me about my enquiry and store
                these details in line with its privacy policy.
              </FieldLabel>
              <FieldError>{errors.consent?.message}</FieldError>
            </Field>
          </FieldGroup>
        </FieldSet>

        {status === "error" ? (
          <p role="alert" className="text-sm leading-6 text-cannon-600">
            Something went wrong sending your message. Please try again, or
            email admissions directly.
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" aria-hidden="true" />
                Sending
              </>
            ) : (
              <>
                Send message
                <ArrowRight aria-hidden="true" />
              </>
            )}
          </Button>

          <p className="datum text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Replies within one working day
          </p>
        </div>
      </FieldGroup>
    </form>
  );
}
