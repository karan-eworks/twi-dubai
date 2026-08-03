"use client";
import { useLenis } from "@/hooks/useLenis";
import { ScrollControls } from "../ui/ScrollControls";

export function ClientChrome() {
  useLenis();
  return <ScrollControls />;
}
