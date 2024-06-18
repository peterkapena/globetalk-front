import React from "react";
import { Box, Typography, List, ListItem, IconButton } from "@mui/joy";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import HelpIcon from "@mui/icons-material/Help";

export default function Support() {
  const supportOptions = [
    {
      type: "Email Support",
      details: "support@globetalk.com",
      icon: <MailIcon />,
    },
    {
      type: "Phone Support",
      details: "+1 (800) 123-4567",
      icon: <PhoneIcon />,
    },
    {
      type: "FAQ",
      details: "Frequently Asked Questions",
      icon: <HelpIcon />,
    },
  ];

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 4 }}>
      <Typography component="h1" sx={{ fontSize: "2.5rem", mb: 3 }}>
        Support
      </Typography>

      <Typography component="p" sx={{ mb: 2 }}>
        If you need assistance, we're here to help! You can reach out to us through any of the following methods.
      </Typography>

      <List>
        {supportOptions.map((option, index) => (
          <ListItem
            key={index}
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <IconButton color="primary">{option.icon}</IconButton>
            <Box sx={{ ml: 2 }}>
              <Typography sx={{ fontWeight: 'bold' }}>{option.type}</Typography>
              <Typography>{option.details}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>

      <Typography component="p" sx={{ mt: 4 }}>
        For immediate assistance, please call our 24/7 support line at +1 (800) 123-4567.
      </Typography>
    </Box>
  );
}
