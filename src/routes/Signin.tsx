"use client";
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

export default function Page() {
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();
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
    try {
      setIsLoading(true);

      const input: SigninInput = {
        password: data.password,
        email: data.email,
      };

      const rtn = (await signin({ variables: { input } })).data?.signin;

      // if (IS_DEVELOPER) console.log(rtn);

      if (rtn?.messages.length > 0) {
        setMessages(["sign in failed"]);
      } else if (rtn?.token) {
        localStorage.setItem(STR_TOKEN, rtn.token);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        window.location.href = ROUTES.HOME;
      }
      setIsSuccess(Boolean(rtn?.messages.length === 0));
    } catch (error) {
      setMessages(["sign in failed"]);
      console.error(error);
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
        m: 0,
        height: "100vh",
      }}
    >
      <Sheet
        sx={{
          width: "550px",
          mx: "auto",
          height: "65%",
          my: 5,
          p: 3,
          display: "flex",
          flexDirection: "column",
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <form onSubmit={handleSubmit(processForm)}>
          <Box sx={{ mb: 3, display: "grid", placeItems: "center" }}>
            <div style={{ justifySelf: "end" }}>
              <ColorSchemeToggle />
            </div>
            <div>
              <Typography level="h2" component="h1" sx={{ mb: 2 }}>
                <b>{t("auth.signin")}</b>
              </Typography>
            </div>
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

          {messages.length === 0 && showSubmitButton && (
            <SubmitLoadingButton
              isLoading={isLoading}
              title={t("auth.signin")}
            ></SubmitLoadingButton>
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
            {" "}
            <Typography style={{ fontSize: 12 }}>
              {t("auth.signin_to_continue")}
            </Typography>
          </Box>

          <Box
            sx={{
              my: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ marginLeft: "auto" }}>
              <Button
                variant="plain"
                size="sm"
                onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
                sx={{ textDecoration: "underline" }}
              >
                {t("auth.forgot_password")}
              </Button>
            </Box>
          </Box>

          <Divider> New to our community </Divider>

          <Box
            sx={{
              my: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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

const SIGNIN = gql(`
mutation Signin($input: SigninInput!) {
  signin(input: $input) {
    email
    messages
    token
  }
}
`);

const FormSchema = z.object({
  password: z
    .string({})
    .min(1, "this is required")
    .min(8, "Not shorter than 8")
    .max(100, "This must be less than 100 characters long"),
  email: z
    .string({})
    .min(1, "this is required")
    //.email("Invalid email")
    .max(100, "This must be less than 100 characters long"),
});

type FormSchemaType = z.infer<typeof FormSchema>;
