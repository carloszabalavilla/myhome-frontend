import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import XIcon from "@mui/icons-material/X";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SignInIcons() {
  const secColor = useTheme().palette.secondary.main;
  return (
    <Box align="center">
      <Button
        sx={{
          ":hover": {
            color: secColor,
            backgroundColor: "transparent",
            transition: "all 0.2s",
            transform: "scale(1.1)",
          },
        }}
      >
        <FacebookIcon />
      </Button>
      <Button
        sx={{
          ":hover": {
            color: secColor,
            backgroundColor: "transparent",
            transition: "all 0.2s",
            transform: "scale(1.1)",
          },
        }}
      >
        <GoogleIcon />
      </Button>
      <Button
        sx={{
          ":hover": {
            color: secColor,
            backgroundColor: "transparent",
            transition: "all 0.2s",
            transform: "scale(1.1)",
          },
        }}
      >
        <XIcon />
      </Button>
    </Box>
  );
}
