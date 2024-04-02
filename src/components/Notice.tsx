"use client";
import Box from "@mui/joy/Box";
import { Typography, Alert, IconButton } from "@mui/joy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CloseOutlined } from "@mui/icons-material";

type NoticeProps = {
  onClose: () => void;
  messages: string[];
  isSuccess?: boolean | undefined;
};
export function Notice({ onClose, messages, isSuccess = false }: NoticeProps) {
  const alertColor = isSuccess ? "success" : "danger"; // Determine the alert color based on success

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        width: "100%",
        flexDirection: "column",
        mt: 3,
      }}
    >
      <Alert
        key={isSuccess ? "Success" : "Danger"} // Use dynamic key for Alert
        sx={{ alignItems: "flex-start" }}
        startDecorator={isSuccess ? <CheckCircleIcon /> : null}
        variant="soft"
        color={alertColor}
        endDecorator={
          <Box sx={{ display: { xs: "inline-grid", sm: "flex" } }}>
            {
              <IconButton
                variant="solid"
                color={alertColor}
                sx={{ m: 2, mb: 0, px: 1, pb: 0.5 }}
                onClick={() => onClose()}
              >
                <CloseOutlined />
              </IconButton>
            }
          </Box>
        }
      >
        <div>
          <div>{isSuccess ? "Success" : "Failed"}</div>
          <Typography level="body-sm" color={alertColor}>
            {messages ? messages.join("\n") : ""}
          </Typography>
        </div>
      </Alert>
    </Box>
  );
}
