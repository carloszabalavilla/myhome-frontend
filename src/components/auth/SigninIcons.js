import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import XIcon from "@mui/icons-material/X";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SignInIcons() {
  const buttonSx = {
    transition: "all 0.5s",
    ":hover": {
      color: useTheme().palette.secondary.main,
      backgroundColor: "transparent",
      transform: "scale(1.3)",
    },
  };

  return (
    <Box align="center">
      <Button sx={buttonSx}>
        <FacebookIcon />
      </Button>
      <Button sx={buttonSx}>
        <GoogleIcon />
      </Button>
      <Button sx={buttonSx}>
        <XIcon />
      </Button>
    </Box>
  );
}
