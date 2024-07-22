import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Sheet, Typography } from "@mui/joy";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { IS_DEVELOPER, ROUTES, STR_TOKEN } from "../helpers/common";
import Password from "../components/Password";
import { SubmitLoadingButton } from "../components/SubmitLoadingButton";
import { Notice } from "../components/Notice";
import { gql, useMutation } from "@apollo/client";
import { SigninInput } from "../__generated__/graphql";
import { useTranslation } from "react-i18next";
import Email from "../components/Email";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle";

const SIGNIN = gql`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      email
      messages
      token
    }
  }
`;

const FormSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function Page() {
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: IS_DEVELOPER ? "peterkapenapeter@gmail.com" : "",
      password: IS_DEVELOPER ? "PETER_KAPENA_PASSWORD" : "",
    },
  });

  const [signin] = useMutation(SIGNIN);

  const processForm: SubmitHandler<FormSchemaType> = async (data) => {
    setIsLoading(true);

    try {
      const input: SigninInput = {
        password: data.password,
        email: data.email,
      };

      const response = await signin({ variables: { input } });
      const { messages, token } = response.data?.signin || {};

      if (messages && messages.length > 0) {
        setMessages(["Sign in failed"]);
      } else if (token) {
        localStorage.setItem(STR_TOKEN, token);
        setTimeout(() => navigate(ROUTES.HOME), 1000);
      }
      setIsSuccess(messages?.length === 0);
    } catch (error) {
      setMessages(["Sign in failed"]);
      console.error("Sign-in error:", error);
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
        p: 2,
      }}
    >
      <Sheet
        sx={{
          width: "100%",
          maxWidth: "550px",
          p: 3,
          borderRadius: "sm",
          boxShadow: "md",
          position: "relative", // Added to position ColorSchemeToggle
        }}
        variant="outlined"
      >
        <div style={{ justifySelf: "left" }}>
          <ColorSchemeToggle />
        </div>

        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center the content
          }}
        >
          <Typography
            level="h2"
            component="h1"
            sx={{ mb: 1, textAlign: "center" }}
          >
            <b>{t("auth.signin")}</b>
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(processForm)}>
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

          {messages.length === 0 && showSubmitButton && (
            <SubmitLoadingButton
              isLoading={isLoading}
              title={t("auth.signin")}
            />
          )}

          {messages.length > 0 && (
            <Notice
              isSuccess={isSuccess}
              onClose={() => {
                setShowSubmitButton(true);
                setMessages([]);
              }}
              messages={messages}
            />
          )}

          <Box
            sx={{
              my: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "0.75rem" }}>
              {t("auth.signin_to_continue")}
            </Typography>
            <Button
              variant="plain"
              size="sm"
              onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
              sx={{ textDecoration: "underline" }}
            >
              {t("auth.forgot_password")}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>New to our community</Divider>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="plain"
              size="sm"
              onClick={() => navigate(ROUTES.SIGNUP)}
            >
              {t("auth.click_to_signup")}
            </Button>
          </Box>
        </form>
      </Sheet>
    </Sheet>
  );
}
