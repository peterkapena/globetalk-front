"use client";
import { FormHelperText, Textarea } from "@mui/joy";
import { TextareaHTMLAttributes } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { FieldError } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: any;
  fieldError: FieldError | undefined;
  fieldName: string;
  label: string;
  minRows?: string | number;
  maxRows?: string | number;
}

export default function ({
  register,
  label,
  fieldError,
  fieldName,
  ...rest
}: TextareaProps) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Textarea
        {...register(fieldName)}
        error={Boolean(fieldError?.message)}
        {...rest}
      />
      {fieldError?.message && (
        <FormHelperText>
          <InfoOutlined />
          {fieldError.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
