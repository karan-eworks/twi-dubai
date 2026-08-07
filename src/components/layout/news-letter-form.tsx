"use client";

import { Check, Mail } from "lucide-react";
import { type FormEvent, useState } from "react";

type NewsletterStatus =
  | { type: "idle"; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export function NewsletterForm() {
  const [status, setStatus] = useState<NewsletterStatus>({
    type: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Captured before the await: currentTarget is nulled once the handler
    // yields, so resetting it after the fetch would throw.
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        setStatus({
          type: "error",
          message: data.error ?? "Enter a valid email address.",
        });
        return;
      }

      form.reset();
      setStatus({
        type: "success",
        message: data.message ?? "You are subscribed to TWI Dubai updates.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Subscription failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const hasError = status.type === "error";

  return (
    <form className="mt-5" onSubmit={handleSubmit} noValidate>
      <label htmlFor="footer-newsletter-email" className="sr-only">
        Email address
      </label>

      <div
        className={`flex min-h-12 overflow-hidden rounded-md border bg-white transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white ${
          hasError ? "border-cannon-400" : "border-white/20"
        }`}
      >
        <span className="grid w-11 shrink-0 place-items-center text-navy-400">
          <Mail className="size-4" aria-hidden="true" />
        </span>

        <input
          id="footer-newsletter-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email address"
          required
          aria-invalid={hasError || undefined}
          aria-describedby="footer-newsletter-status"
          className="min-w-0 flex-1 bg-transparent px-1 text-sm font-medium text-navy-900 outline-none placeholder:text-stone-500"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting || undefined}
          className="min-h-12 shrink-0 bg-navy-500 px-4 text-sm font-semibold tracking-[0.01em] text-white transition-colors duration-200 hover:bg-navy-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60 sm:px-5"
        >
          {isSubmitting ? "Subscribing…" : "Subscribe"}
        </button>
      </div>

      <p
        id="footer-newsletter-status"
        aria-live="polite"
        className={
          status.type === "idle"
            ? "sr-only"
            : `mt-3 flex items-start gap-2 text-sm leading-6 ${
                status.type === "success" ? "text-white" : "text-cannon-300"
              }`
        }
      >
        {status.type === "success" ? (
          <Check
            className="mt-1 size-4 shrink-0 text-cannon-400"
            aria-hidden="true"
          />
        ) : null}
        {status.message}
      </p>
    </form>
  );
}
