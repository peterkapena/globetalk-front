import { FormHelperText } from "@mui/joy";
import { InputHTMLAttributes } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { FieldError } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";

interface TextFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  register: any;
  fieldError: FieldError | undefined;
  fieldName: string;
  label: string;
}

 function TextField ({
  register,
  fieldError,
  fieldName,
  label,
  type,
  ...rest
}: TextFieldProps) {
  const valueAsNumber = type === "number";

  return (
    <FormControl sx={{ my: 1 }}>
      <FormLabel>{label}</FormLabel>
      <Input
        {...register(fieldName, { valueAsNumber })}
        error={Boolean(fieldError?.message)}
        {...rest}
        type={type}
      />
      {fieldError?.message && (
        <FormHelperText sx={{ color: "red" }}>
          <InfoOutlined color="error" />
          {fieldError.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default TextField