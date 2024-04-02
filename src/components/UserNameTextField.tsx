import { FieldError } from "react-hook-form";
import TextField from "./TextField";

const UserNameTextField = ({
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
      label={"Username"}
      fieldName="username"
      placeholder="johndoe"
      register={register}
      fieldError={error}
      type="text"
    ></TextField>
  );
};

export default UserNameTextField;
