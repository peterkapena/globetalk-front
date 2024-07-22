/* eslint-disable no-lone-blocks */
import { Box, Checkbox, Divider, IconButton, Typography } from "@mui/joy";
import { t } from "i18next";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Password from "../components/Password";
import ConfirmPassword from "../components/ConfirmPassword";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../helpers/common";
import { z } from "zod";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { gql } from "@apollo/client";
import { SubmitLoadingButton } from "../components/SubmitLoadingButton";
import { Notice } from "../components/Notice";
import CustomSwitch from "../components/CustomSwitch";
import { UserType, useUser } from "../redux/user-slice";

const SetUserTypeMutation = gql`
  mutation SetUserType($userType: Float!) {
    setUserType(userType: $userType)
  }
`;

export default function Setting() {
  //const [showSubmitButton] = useState(true);
  const navigate = useNavigate();
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const user = useUser();
  const [isPremium, setIsPremium] = useState(user.userType !== 0)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  {
    /* {
      label: t("settings.add_a_payment_method"),
      icon: <ChevronRightIcon />,
      onClick: () => navigate(ROUTES.ADD_A_PAYMENT_METHOD),
    }, 
    */
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const menuItems = [
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

  const [passwordUpdate] = useMutation(PASSWORDUPDATE);
  const [setUserType] = useMutation(SetUserTypeMutation);

  const processForm: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      setIsLoading(true);

      const rtn = (await passwordUpdate({ variables: { ...data } })).data
        ?.passwordUpdate;

      // if (IS_DEVELOPER) console.log(rtn);

      if (rtn) {
        setIsSuccess(rtn);
        setMessages(["password updated."]);
      } else {
        setMessages(["password update failed"]);
      }
    } catch (error) {
      setMessages(["sign in failed"]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  async function setAccountType(isPremium: boolean) {
    await setUserType({ variables: { userType: isPremium ? UserType.PREMIUM : UserType.BASIC } })
  }

  return (
    <>
      <Box sx={{ width: "1100px", margin: "0 auto", padding: 4 }}>
        <Box sx={{ my: 1, mx: 4, justifyContent: "center" }}>
          <Typography component="h1" sx={{ fontSize: "2.5rem" }}>
            {t("sidebar.settings")}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ my: 6, mx: -30 }}>
            <Typography component="h6" sx={{ fontSize: "1.5rem" }}>
              {t("settings.change_password")}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ my: 13, mx: 15 }}>
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

                {messages.length === 0 && showSubmitButton && (
                  <SubmitLoadingButton
                    isLoading={isLoading}
                    title={t("settings.save")}
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
              </form>
              <Box sx={{ m: 5, textAlign: "center" }}>
                <Divider />
              </Box>
              <Box sx={{ my: 5 }}>
                <CustomSwitch checked={isPremium} setChecked={setIsPremium} label="Premium" onChange={setAccountType}></CustomSwitch>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ my: -5, mx: 15, textAlign: "center" }}>
          <Divider />
        </Box>


        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ my: 8, mx: -20 }}>
            <Typography component="h6" sx={{ fontSize: "1.5rem" }}>
              {t("settings.More")}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ my: 13, mx: 25 }}>
              <form>
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
                      <span
                        onClick={item.onClick}
                        style={{ cursor: "pointer" }}
                      >
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
      </Box>
    </>
  );
}

const PASSWORDUPDATE = gql(`
mutation PasswordUpdate($password: String!) {
  passwordUpdate(password: $password)
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
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;
