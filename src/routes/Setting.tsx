import { Box, Button, Divider, IconButton, Typography } from "@mui/joy";
import { t } from "i18next";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Password from "../components/Password";
import ConfirmPassword from "../components/ConfirmPassword";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IS_DEVELOPER, ROUTES } from "../helpers/common";
import { z } from "zod";

export default function Setting() {
  const [showSubmitButton] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: IS_DEVELOPER ? "1234567P" : "",
      confirm_password: IS_DEVELOPER ? "1234567P" : "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const menuItems = [
    {
      label: t("settings.add_a_payment_method"),
      icon: <ChevronRightIcon />,
      onClick: () => navigate(ROUTES.ADD_A_PAYMENT_METHOD),
    },
    {
      label: t("settings.about_us"),
      icon: <ChevronRightIcon />,
      onClick: () => navigate(ROUTES.ABOUT_US),
    },
    {
      label: t("settings.privacy_policy"),
      icon: <ChevronRightIcon />,
      onClick: () => navigate(ROUTES.PRIVACY_POLICY),
    },
    {
      label: t("settings.terms_of_use"),
      icon: <ChevronRightIcon />,
      onClick: () => navigate(ROUTES.TERMS_OF_USE),
    },
  ];

  const processForm: SubmitHandler<FormSchemaType> = async (data) => {
    console.log(data);
  };


  return (
    <>
      <Box
        sx={{
          display: "flex",
          minWidth: "70vw",
        }}
      >
        <Box sx={{ width: "600px", display: "flex", flexDirection: "column" }}>
          <Box sx={{ my: 1, justifyContent: "center" }}>
            <Box sx={{ my: 2 }}>
              <Typography component="h6" sx={{ fontSize: "2rem" }}>
                {t("sidebar.settings")}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ my: 4 }}>
              <Typography component="h6" sx={{ fontSize: "1.5rem" }}>
                {t("settings.change_password")}
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(processForm)}>
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

              <Button type="submit" variant="solid" color="primary">
                {t("settings.save")}
              </Button>
            </form>
          </Box>

          <Box sx={{ my: 4, textAlign: "center" }}>
            <Divider />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <form>
              <Box sx={{ my: 2 }}>
                <Typography component="h6" sx={{ fontSize: "1.5rem" }}>
                  {t("settings.More")}
                </Typography>
              </Box>

              {menuItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 1,
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: 400,
                    margin: "0 auto",
                  }}
                >
                  <Typography sx={{ mb: 0 }}>
                    <span onClick={item.onClick} style={{ cursor: "pointer" }}>
                      {item.label}
                    </span>
                  </Typography>
                  <IconButton onClick={item.onClick}>{item.icon}</IconButton>
                </Box>
              ))}
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}

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
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;
