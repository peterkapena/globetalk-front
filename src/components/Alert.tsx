import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Typography from "@mui/joy/Typography";
import { ErrorOutlineOutlined, InfoRounded } from "@mui/icons-material";

export type AlertProps = {
  message: string;
  onYes: () => void;
  onClose: () => void;
  type: "warning" | "notice" | "error" | "confirm";
};

export default function AlertDialogModal({
  message,
  onYes,
  onClose,
  type,
}: AlertProps) {
  const [open, setOpen] = React.useState<boolean>(true);
  const close = () => {
    onClose();
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Modal open={open} onClose={close}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            level="h2"
            startDecorator={
              type === "warning" ? (
                <WarningRoundedIcon />
              ) : type === "error" ? (
                <ErrorOutlineOutlined />
              ) : (
                <InfoRounded />
              )
            }
          >
            {type === "warning"
              ? "Warning!"
              : type === "error"
              ? "Error"
              : type === "confirm"
              ? "Confirm"
              : "Please note"}
          </Typography>
          <Divider />
          <Typography
            id="alert-dialog-modal-description"
            textColor="text.tertiary"
          >
            {message}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "space-evenly",
              pt: 2,
            }}
          >
            {type === "confirm" && (
              <Button
                variant="outlined"
                color="danger"
                onClick={() => {
                  onYes();
                  setOpen(false);
                }}
              >
                Yes
              </Button>
            )}
            <Button variant="outlined" color="primary" onClick={close}>
              {type === "warning" || type === "confirm" ? "Cancel" : "Ok"}
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
