"use client";

import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";
import { CheckIcon, ChevronsUpDown, Globe } from "lucide-react";
import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Country = RPNInput.Country;
type FlagProps = {
  country?: Country;
  countryName: string;
};

type CountrySelectProps = {
  value?: Country;
  onChange: (value?: Country) => void;
  options: Array<{ value: Country | undefined; label: string }>;
  disabled?: boolean;
};

function FlagComponent({ country, countryName }: FlagProps) {
  const Flag = country ? flags[country] : undefined;

  if (!Flag) {
    return (
      <span className="flex h-4 w-6 items-center justify-center overflow-hidden rounded-sm bg-foreground/20">
        <Globe className="size-3.5 text-muted-foreground" />
      </span>
    );
  }

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg]:size-full">
      <Flag title={countryName} />
    </span>
  );
}

function CountrySelect({
  value,
  onChange,
  options,
  disabled,
}: CountrySelectProps) {
  const [open, setOpen] = React.useState(false);

  const selected = options.find((option) => option.value === value);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label="Select country code"
          disabled={disabled}
          className="inline-flex h-11 shrink-0 items-center gap-1 rounded-s-sm border border-input border-r-0 bg-transparent px-2.5 transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:bg-muted aria-invalid:border-destructive"
        >
          <FlagComponent
            country={value}
            countryName={selected?.label ?? "Country"}
          />
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={4}
          className="z-50 w-72 rounded-lg border border-border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          <Command className="overflow-hidden">
            <div className="flex items-center border-b border-border px-2">
              <Command.Input
                placeholder="Search country…"
                className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <Command.List className="max-h-72 overflow-y-auto p-1">
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                No country found.
              </Command.Empty>
              <Command.Group>
                {options
                  .filter((option) => option.value)
                  .map((option) => (
                    <Command.Item
                      key={option.value}
                      value={option.label}
                      onSelect={() => {
                        onChange(option.value);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none select-none",
                        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
                      )}
                    >
                      <FlagComponent
                        country={option.value}
                        countryName={option.label}
                      />
                      <span className="flex-1">{option.label}</span>
                      {option.value === value && (
                        <CheckIcon className="size-4 text-primary" />
                      )}
                    </Command.Item>
                  ))}
              </Command.Group>
            </Command.List>
          </Command>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <Input
    type="tel"
    autoComplete="tel"
    className={cn("h-11 rounded-s-none rounded-e-sm", className)}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

export type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, value, ...props }, ref) => {
      return (
        <RPNInput.default
          ref={ref}
          className={cn("flex w-full", className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          smartCaret={false}
          value={value || undefined}
          onChange={(nextValue) =>
            onChange?.(nextValue || ("" as RPNInput.Value))
          }
          {...props}
        />
      );
    },
  );
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
