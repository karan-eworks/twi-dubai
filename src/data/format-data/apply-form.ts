import { clean, normalizeBoolean } from "@/lib/clean";
import type { FormFieldApiItem, FormApiItem } from "@/data/types/forms";
import type { CourseApiItem } from "@/data/types/courses";

export type ApplyFieldType =
  | "text"
  | "email"
  | "phone"
  | "select"
  | "textarea"
  | "course"
  | "captcha";

export interface ApplyFieldOption {
  value: string;
  label: string;
}

export interface ApplyFieldDescriptor {
  slug: string;
  label: string;
  required: boolean;
  type: ApplyFieldType;
  half: boolean;
  options: ApplyFieldOption[];
}

export interface ApplyFormConfig {
  slug: string;
  name: string;
  buttonLabel: string;
  hasCaptcha: boolean;
  recaptchaSiteKey?: string;
  fields: ApplyFieldDescriptor[];
}

function mapInputType(inputTypeSlug: string | undefined): ApplyFieldType {
  switch (inputTypeSlug) {
    case "email":
      return "email";
    case "phone-number":
      return "phone";
    case "textarea":
      return "textarea";
    case "course":
      return "course";
    case "captcha":
      return "captcha";
    case "select":
      return "select";
    default:
      return "text";
  }
}

function fieldOptions(field: FormFieldApiItem): ApplyFieldOption[] {
  return (field.attribute.options ?? [])
    .map((option) => option.option)
    .filter((option): option is string => Boolean(clean(option)))
    .map((option) => ({ value: option, label: option }));
}

export function normalizeEnrolForm(form: FormApiItem): ApplyFormConfig {
  const fields = form.fields
    .map((field) => {
      const required = field.required !== undefined && normalizeBoolean(field.required);
      return {
        slug: clean(field.slug) ?? "",
        label: clean(field.name) ?? "",
        required,
        type: mapInputType(field.attribute?.input_type?.slug),
        half: field.layout_width === "col-md-6",
        options: fieldOptions(field),
      };
    })
    .filter((field) => field.slug);

  return {
    slug: form.slug,
    name: form.name,
    buttonLabel: clean(form.button_label) ?? "Submit application",
    hasCaptcha: normalizeBoolean(form.has_captcha),
    recaptchaSiteKey: clean(form.recaptcha_site_key) ?? undefined,
    fields,
  };
}

export function courseOptions(courses: CourseApiItem[]): ApplyFieldOption[] {
  return courses
    .filter((course) => {
      if (!course.active) return false;
      if (course.show_in_select_dropdown === false) return false;
      return Boolean(clean(course.title));
    })
    .map((course) => ({ value: course.title, label: course.title }));
}