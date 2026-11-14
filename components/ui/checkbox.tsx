"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function Checkbox({ className, label, onCheckedChange, onChange, ...props }: CheckboxProps) {
  const handleChange = (onChange || onCheckedChange)
    ? (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        onCheckedChange?.(e.target.checked);
      }
    : undefined;

  const box = (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 shrink-0 cursor-pointer rounded border-input accent-primary disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onChange={handleChange}
      {...props}
    />
  );

  if (!label) return box;

  return (
    <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-foreground">
      {box}
      {label}
    </label>
  );
}
