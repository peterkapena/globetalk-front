"use client";
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

export default function Page() {
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();
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
    try {
      setIsLoading(true);
      const input: SignupInput = {
        password: data.password,
        email: data.email,
      };
      const rtn = (await signup({ variables: { input } })).data.signup;
      if (IS_DEVELOPER) console.log(rtn);

      setShowSubmitButton(false);
      if (rtn) {
        setMessages([
          ...messages,
          "Sign up was successful. You will be redirected to sign-in in " +
            AUTO_SIGNIN_TIMEOUT_REDIRECT +
            " seconds or signin now.",
        ]);
        setTimeout(
          () => (window.location.href = "/"),
          AUTO_SIGNIN_TIMEOUT_REDIRECT * 1000
        );
      } else {
        setMessages([
          ...messages,
          "Sign up failed. Try using different credentials. Otherwise, please contact support.",
        ]);
      }
      setIsSuccess(Boolean(rtn));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        m: 0,
        p: 2,
      }}
    >
      <Sheet
        sx={{
          mt: 16,
          width: 500,
          height: "65%",
          mx: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <form onSubmit={handleSubmit(processForm)}>
          <Box sx={{ mb: 8, display: "grid", placeItems: "center" }}>
            <div style={{ justifySelf: "end" }}>
              <ColorSchemeToggle />
            </div>
            <div>
              <Typography level="h2" component="h1" sx={{ mb: 0 }}>
                <b>{t("auth.signup")}</b>
              </Typography>
            </div>
            <Button
              variant="plain"
              size="sm"
              onClick={() => navigate(ROUTES.SIGNIN)}
              sx={{ fontSize: "0.70rem" }}
            >
              {t("auth.already_has_acc")}
            </Button>
          </Box>

          <Email
            showSubmitButton={showSubmitButton}
            error={errors.email}
            register={register}
          ></Email>

          <Password
            showSubmitButton={showSubmitButton}
            error={errors.password}
            register={register}
          ></Password>
          <ConfirmPassword
            showSubmitButton={showSubmitButton}
            error={errors.confirm_password}
            register={register}
          ></ConfirmPassword>

<Box
            sx={{
              my: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {" "}
            <Typography style={{ fontSize: 12 }}>
              {t("auth.signup_to_continue")}
            </Typography>
          </Box>
          {showSubmitButton && (
            <SubmitLoadingButton
              isLoading={isLoading}
              title={t("auth.sign_up_btn")}
            ></SubmitLoadingButton>
          )}

          {!showSubmitButton && messages.length > 0 && (
            <Notice
              isSuccess={isSuccess}
              onClose={() => {
                setShowSubmitButton(true);
                setMessages([]);
                reset();
                isSuccess && navigate(ROUTES.SIGNIN);
              }}
              messages={messages}
            />
          )}
        </form>
      </Sheet>
    </Sheet>
  );
}

const SIGNUP = gql(`
mutation Signup($input: SignupInput!) {
  signup(input: $input)
}
`);

export const FormSchema = z
  .object({
    password: z
      .string({})
      .min(1, "this is required")
      .min(8, "Not shorter than 8")
      .max(100, "This must be less than 100 characters long"),
    confirm_password: z
      .string({})
      .min(1, "this is required")
      .min(8, "Not shorter than 8")
      .max(100, "This must be less than 100 characters long"),
    email: z
      .string({})
      .min(1, "this is required")
      .email("Invalid email")
      .max(100, "This must be less than 100 characters long"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type FormSchemaType = z.infer<typeof FormSchema>;

export interface ValidationResult {
  success: boolean;
  data: FormSchemaType;
  _id?: string;
}
