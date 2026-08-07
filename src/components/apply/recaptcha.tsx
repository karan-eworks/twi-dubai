"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
        },
      ) => number;
      getResponse: (widgetId: number) => string;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadRecaptcha(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve) => {
    const existing = document.getElementById("google-recaptcha-v2");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.id = "google-recaptcha-v2";
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });

  return scriptPromise;
}

/**
 * reCAPTCHA v2 checkbox, rendered explicitly into its own container.
 * Surfaces the verification token through `onToken` (empty string on
 * reset/expiry) so the parent form can gate submission.
 */
export function Recaptcha({
  siteKey,
  onToken,
}: {
  siteKey: string;
  onToken: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!containerRef.current) return;

    const widgetId = loadRecaptcha().then(() => {
      if (!containerRef.current || !window.grecaptcha) return;
      const instance = window.grecaptcha.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(""),
      });
      widgetIdRef.current = instance;
    });

    return () => {
      widgetId.catch(() => {});
    };
  }, [siteKey]);

  return <div ref={containerRef} className="min-h-[78px]" />;
}
