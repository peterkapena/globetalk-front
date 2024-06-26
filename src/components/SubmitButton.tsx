import { Box } from "@mui/joy";
import React from "react";
import Button from "@mui/joy/Button";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type SubmitButtonProps = {
  showReturn?: boolean;
  content?: React.ReactNode;
};
export function SubmitButton({
  showReturn: hideReturn = true,
  content = "Submit",
}: SubmitButtonProps): React.ReactNode {
  const navigate = useNavigate();
  return (
    <Box>
      {hideReturn && (
        <Button
          type="button"
          onClick={() => navigate(-1)}
          sx={{ mt: 3 }}
          variant="plain"
          startDecorator={<ArrowBack />}
        >
          Return
        </Button>
      )}
      <Button type="submit" color="success" sx={{ mt: 3 }}>
        {content}
      </Button>
    </Box>
  );
}
