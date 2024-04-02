import TextField from "./TextField";
import { FieldError } from "react-hook-form";

const Password = ({
  showSubmitButton,
  register,
  error,
}: {
  showSubmitButton: boolean;
  register: any;
  error: FieldError | undefined;
}) => {
  return (
    <TextField
      disabled={Boolean(!showSubmitButton)}
      label={"Password"}
      fieldName="password"
      placeholder="password"
      register={register}
      fieldError={error}
      type="password"
    ></TextField>
  );
};

export default Password;
