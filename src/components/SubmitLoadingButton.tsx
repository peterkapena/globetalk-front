"use client";
import Button from "@mui/joy/Button";
import { CircularProgress } from "@mui/joy";

type SubmitLoadingButtonProps = {
  isLoading: boolean;
  title: string;
};

export function SubmitLoadingButton(props: SubmitLoadingButtonProps) {
  const { isLoading, title } = props;

  return (
    <Button
      disabled={isLoading}
      fullWidth
      type="submit"
      sx={{ mt: 1, borderRadius: 'xl' /* margin top */ }}
      endDecorator={
        isLoading && ( //The circular check progress when Signing in.
          <CircularProgress
            color="primary"
            size="sm"
            value={25}
            variant="plain"
          />
        )
      }
    >
      {title}
    </Button>
  );
}
