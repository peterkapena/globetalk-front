
import { Box, Typography, List, ListItem, IconButton } from "@mui/joy";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import HelpIcon from "@mui/icons-material/Help";
import { useTranslation } from "react-i18next";

export default function Support() {
 const {t}=useTranslation()

  const supportOptions = [
    {
      type: t("support.emailsupport"),
      details: "support@globetalk.com",
      icon: <MailIcon />,
    },
    {
      type:  t("support.phonesupport"),
      details: "+27 (800) 123-4567",
      icon: <PhoneIcon />,
    },
    {
      type: t("support.faq"),
      details: t("support.faqs"),
      icon: <HelpIcon />,
    },
  ];

  return (
    <Box>
      <Box sx={{ my: 2, }}>
        <Typography component="h1" sx={{ fontSize: "2.5rem" }}>
          Support
        </Typography>
      </Box>

      <Box sx={{ my: 2, }}>
        <Typography component="p" sx={{ mb: 2 }}>
        {t("support.wording1")}
        </Typography>

        <List>
          {supportOptions.map((option, index) => (
            <ListItem
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <IconButton color="primary">{option.icon}</IconButton>
              <Box sx={{ ml: 2 }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {option.type}
                </Typography>
                <Typography>{option.details}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>

        <Typography component="p" sx={{ mt: 4 }}>
          {t("support.wording2")}
        </Typography>
      </Box>
    </Box>
  );
}
