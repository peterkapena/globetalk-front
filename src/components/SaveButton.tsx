"use client";
import { Box } from "@mui/joy";
import React from "react";
import Button from "@mui/joy/Button";
import { ArrowBack, Save } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export function SaveButton(): React.ReactNode {
  const navigate = useNavigate();
  return (
    <Box display={"flex"} justifyContent={"space-around"}>
      <Button
        type="button"
        onClick={() => navigate(-1)}
        sx={{ mt: 3 }}
        variant="plain"
        startDecorator={<ArrowBack />}
      >
        Return
      </Button>
      <Button
        type="submit"
        sx={{ mt: 3 }}
        variant="outlined"
        startDecorator={<Save />}
      >
        Save
      </Button>
    </Box>
  );
}
