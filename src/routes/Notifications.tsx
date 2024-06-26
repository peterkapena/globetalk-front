import React, { useState } from "react";
import { Box, Typography, Button, List, ListItem, IconButton } from "@mui/joy";
import ClearIcon from "@mui/icons-material/Clear";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    "Your meeting is scheduled for 3 PM today.",
    "You have a new message from John Doe.",
    "Your payment was successful.",
    "Reminder: Project deadline is tomorrow.",
  ]);

  const handleClearNotification = (index: number) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 4 }}>
      <Typography component="h1" sx={{ fontSize: "2.5rem", mb: 3 }}>
        Notifications
      </Typography>

      <Typography component="p" sx={{ mb: 2 }}>
        Here are your recent notifications. You can clear individual notifications or clear all at once.
      </Typography>

      <List>
        {notifications.map((notification, index) => (
          <ListItem
            key={index}
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
          >
            <Typography sx={{ flexGrow: 1 }}>{notification}</Typography>
            <IconButton onClick={() => handleClearNotification(index)} color="primary">
              <ClearIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {notifications.length > 0 ? (
        <Button variant="solid" color="primary" onClick={handleClearAllNotifications}>
          Clear All Notifications
        </Button>
      ) : (
        <Typography component="p" sx={{ mt: 4 }}>
          You have no notifications.
        </Typography>
      )}
    </Box>
  );
}
