import type { ApiListResponse } from "./common";

export type FormListApiResponse = ApiListResponse<FormApiItem>;

export type FormDetailApiResponse = FormApiItem | { data: FormApiItem | null };

export interface FormApiItem {
  id: number;
  name: string;
  slug: string;
  button_label?: string | null;
  description?: string | null;
  extra?: unknown;
  mail_to_admin?: boolean | number | string | null;
  display_order?: number | null;
  publish?: boolean | number | string | null;
  publish_date?: string | null;
  view_count?: number | null;
  categories?: FormCategoryApiItem[];
  fields: FormFieldApiItem[];
  created_at?: string | null;
  updated_at?: string | null;
}

export interface FormCategoryApiItem {
  id: number;
  name?: string | null;
  slug?: string | null;
}

export interface FormFieldApiItem {
  id: number;
  attribute_id: number;
  name: string;
  slug: string;
  layout_width?: string | null;
  display_order?: number | null;
  required?: boolean | number | string | null;
  attribute: FormFieldAttributeApiItem;
}

export interface FormFieldAttributeApiItem {
  id: number;
  name: string;
  slug: string;
  input_type: FormInputTypeApiItem;
  options?: FormFieldOptionApiItem[];
}

export interface FormInputTypeApiItem {
  id: number;
  name: string;
  slug: string;
  has_options?: boolean | number | string | null;
}

export interface FormFieldOptionApiItem {
  id: number;
  option: string;
}
