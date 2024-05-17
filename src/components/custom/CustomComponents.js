import React from "react";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckIcon from "@mui/icons-material/Check";
import { SFormControl, STextField } from "../../styles/StyledComponents";
import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import { green } from "@mui/material/colors";

export function CPasswordInput({
  password,
  setPassword,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
}) {
  return (
    <SFormControl fullWidth required variant="outlined">
      <InputLabel htmlFor="password">Contraseña</InputLabel>
      <OutlinedInput
        id="password"
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </SFormControl>
  );
}

export function CPasswordInputCheck({
  password,
  setPassword,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
}) {
  return (
    <SFormControl fullWidth required variant="outlined" sx={{ marginTop: 1 }}>
      <InputLabel htmlFor="passwordCheck">Repita la contraseña</InputLabel>
      <OutlinedInput
        id="passwordCheck"
        label="PasswordCheck"
        name="passwordCheck"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </SFormControl>
  );
}

export function CEmailInput({ email, setEmail }) {
  return (
    <STextField
      margin="normal"
      required
      fullWidth
      id="email"
      label="Correo electrónico"
      name="email"
      autoComplete="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      autoFocus
    />
  );
}

export function CSubmitButton({ handleSubmit, success, buttonText, loading }) {
  const theme = useTheme();

  const buttonSx = {
    transition: "all 0.2s",
    "&:hover": {
      bgcolor: "secondary.main",
      transform: "scale(1.05)",
    },
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        sx={buttonSx}
      >
        {success ? <CheckIcon /> : buttonText}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: theme.palette.secondary.main,
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-15px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
}
