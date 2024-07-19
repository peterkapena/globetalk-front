import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet, Typography } from "@mui/joy";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { IS_DEVELOPER, ROUTES } from "../helpers/common";
import ConfirmPassword from "../components/ConfirmPassword";
import { Notice } from "../components/Notice";
import { SubmitLoadingButton } from "../components/SubmitLoadingButton";
import Email from "../components/Email";
import Password from "../components/Password";
import { gql, useMutation } from "@apollo/client";
import { SignupInput } from "../__generated__/graphql";
import { t } from "i18next";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle";

const AUTO_SIGNIN_TIMEOUT_REDIRECT = 5;

const SIGNUP = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input)
  }
`;

export const FormSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters"),
    confirm_password: z
      .string()
      .min(1, "Confirm password is required")
      .min(8, "Confirm password must be at least 8 characters")
      .max(100, "Confirm password must be less than 100 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address")
      .max(100, "Email must be less than 100 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;

export default function Page() {
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [gotoSigninTimeout, setGotoSigninTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const [signup] = useMutation(SIGNUP);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: IS_DEVELOPER ? "peterkapenapeter@gmail.com" : "",
      password: IS_DEVELOPER ? "1234567P" : "",
      confirm_password: IS_DEVELOPER ? "1234567P" : "",
    },
  });

  const processForm: SubmitHandler<FormSchemaType> = async (data) => {
    setIsLoading(true);

    try {
      const input: SignupInput = {
        password: data.password,
        email: data.email,
      };
      const response = await signup({ variables: { input } });
      const success = response.data?.signup;

      setShowSubmitButton(false);
      if (success) {
        setMessages([
          "Sign up was successful. You will be redirected to sign-in in " +
            AUTO_SIGNIN_TIMEOUT_REDIRECT +
            " seconds or sign in now.",
        ]);
        setGotoSigninTimeout(
          setTimeout(
            () => navigate(ROUTES.SIGNIN),
            AUTO_SIGNIN_TIMEOUT_REDIRECT * 1000
          )
        );
      } else {
        setMessages([
          "Sign up failed. Try using different credentials. Otherwise, please contact support.",
        ]);
      }
      setIsSuccess(success);
    } catch (error) {
      setMessages(["Sign up failed. Please try again later."]);
      console.error("Sign-up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Sheet
        sx={{
          width: "100%",
          maxWidth: "550px",
          p: 3,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <form onSubmit={handleSubmit(processForm)}>
          <Box sx={{ display: "grid", placeItems: "center", mb: 3 }}>
            <div style={{ justifySelf: "left" }}>
              <ColorSchemeToggle />
            </div>

            <Typography
              level="h2"
              component="h1"
              sx={{ mb: 1, textAlign: "center" }}
            >
              <b>{t("auth.signup")}</b>
            </Typography>
            <Button
              variant="plain"
              size="sm"
              onClick={() => navigate(ROUTES.SIGNIN)}
              sx={{ fontSize: "0.75rem" }}
            >
              {t("auth.already_has_acc")}
            </Button>
          </Box>

          <Email
            showSubmitButton={showSubmitButton}
            error={errors.email}
            register={register}
          />

          <Password
            showSubmitButton={showSubmitButton}
            error={errors.password}
            register={register}
          />

          <ConfirmPassword
            showSubmitButton={showSubmitButton}
            error={errors.confirm_password}
            register={register}
          />

          <Box sx={{ my: 1, display: "flex", justifyContent: "center" }}>
            <Typography sx={{ fontSize: "0.75rem" }}>
              {t("auth.signup_to_continue")}
            </Typography>
          </Box>

          {showSubmitButton && (
            <SubmitLoadingButton
              isLoading={isLoading}
              title={t("auth.sign_up_btn")}
            />
          )}

          {!showSubmitButton && messages.length > 0 && (
            <Notice
              isSuccess={isSuccess}
              onClose={() => {
                setShowSubmitButton(true);
                setMessages([]);
                if (gotoSigninTimeout) {
                  clearTimeout(gotoSigninTimeout);
                }
                reset();
              }}
              messages={messages}
            />
          )}
        </form>
      </Sheet>
    </Sheet>
  );
}
