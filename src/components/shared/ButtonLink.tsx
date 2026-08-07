import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CtaIntent = "primary" | "secondary" | "tertiary";

type ButtonSurface = "light" | "dark";
type ButtonSize = "sm" | "md" | "lg";

const baseButtonClass =
  "twi-button motion-link relative isolate inline-flex items-center justify-center overflow-hidden rounded-[2px] border text-center font-semibold no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none";

const sizeClass: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 py-2 text-sm",
  md: "min-h-11 px-5 py-3 text-sm",
  lg: "min-h-14 px-7 py-3 text-base",
};

const intentClass: Record<ButtonSurface, Record<CtaIntent, string>> = {
  light: {
    primary: "twi-button-primary",
    secondary: "twi-button-secondary",
    tertiary: "twi-button-tertiary",
  },
  dark: {
    primary: "twi-button-primary-dark",
    secondary: "twi-button-secondary-dark",
    tertiary: "twi-button-tertiary-dark",
  },
};

interface ButtonStyleOptions {
  intent?: CtaIntent;
  surface?: ButtonSurface;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

export function buttonClasses({
  intent = "primary",
  surface = "light",
  size = "md",
  fullWidth = false,
  className,
}: ButtonStyleOptions = {}) {
  return cn(
    baseButtonClass,
    sizeClass[size],
    intentClass[surface][intent],
    fullWidth && "w-full",
    className,
    "text-nowrap",
  );
}

function ButtonContent({ children }: { children: ReactNode }) {
  return (
    <span className="twi-button-content flex items-center">{children}</span>
  );
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyleOptions {}

export function Button({
  intent = "primary",
  surface = "light",
  size = "md",
  fullWidth,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-intent={intent}
      data-surface={surface}
      className={buttonClasses({ intent, surface, size, fullWidth, className })}
      {...props}
    >
      <ButtonContent>{children}</ButtonContent>
    </button>
  );
}

export interface ButtonLinkProps
  extends Omit<ComponentProps<typeof Link>, "className">,
    ButtonStyleOptions {
  className?: string;
  disabled?: boolean;
}

export function ButtonLink({
  intent = "primary",
  surface = "light",
  size = "md",
  fullWidth,
  className,
  children,
  disabled = false,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      data-intent={intent}
      data-surface={surface}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      className={buttonClasses({ intent, surface, size, fullWidth, className })}
      {...props}
    >
      <ButtonContent>{children}</ButtonContent>
    </Link>
  );
}

/* ------------------------------------------------------------------
   Usage

   One primary per view. It is the red button, and red is the loudest
   thing on the page:

     <ButtonLink href="/apply" size="lg">Apply now</ButtonLink>
     <ButtonLink href="/visit" intent="secondary">Book a campus visit</ButtonLink>
     <ButtonLink href="/programmes" intent="tertiary">Compare programmes</ButtonLink>

   On the navy hero or any dark band, pass the surface:

     <ButtonLink href="/prospectus" intent="secondary" surface="dark">
       Download prospectus
     </ButtonLink>

   A trailing <svg> nudges right on hover and mirrors under RTL:

     <Button>Continue <ArrowRight /></Button>
------------------------------------------------------------------- */
