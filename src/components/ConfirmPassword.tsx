import { t } from "i18next";
import TextField from "./TextField";
import { FieldError } from "react-hook-form";

const ConfirmPassword = ({
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
      label={t("auth.password_confirm")}
      fieldName="confirm_password"
      register={register}
      fieldError={error}
      type="password"
    ></TextField>
  );
};

export default ConfirmPassword;
