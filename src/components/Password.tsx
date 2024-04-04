import { t } from "i18next";
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
      label={t("auth.password")}
      fieldName="password"
      placeholder="password"
      register={register}
      fieldError={error}
      type="password"
    ></TextField>
  );
};

export default Password;
