import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckIcon from "@mui/icons-material/Check";
import { SFormControl, STextField } from "../../styles/StyledComponents";
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  useTheme,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useFormikContext } from "formik";

export function CPasswordInput({ id, field }) {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <SFormControl
      fullWidth
      required
      margin="normal"
      variant="outlined"
      error={touched[field.name] && Boolean(errors[field.name])}
    >
      <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
      <OutlinedInput
        id={id}
        label={field.label}
        name={field.name}
        type={showPassword ? "text" : "password"}
        value={values[field.name]}
        onBlur={handleBlur}
        onChange={handleChange}
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
      {touched[field.name] && errors[field.name] && (
        <FormHelperText>{errors[field.name]}</FormHelperText>
      )}
    </SFormControl>
  );
}

export function CFieldInput({ id, field }) {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext();

  return (
    <STextField
      autoFocus={field.autoFocus ?? false}
      margin="normal"
      required={field.required}
      fullWidth
      id={id}
      label={field.label}
      name={field.name}
      value={values[field.name]}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched[field.name] && Boolean(errors[field.name])}
      helperText={touched[field.name] && errors[field.name]}
    />
  );
}

export function CSubmitButton(props) {
  const { success, buttonText, isSubmitting, disablingFields } = props;
  const theme = useTheme();
  const buttonSx = {
    transition: "all 0.2s",
    "&:hover": {
      bgcolor: "secondary.main",
      transform: "scale(1.05)",
    },
    ...(success && {
      "&:disabled": {
        bgcolor: green[500],
      },
    }),
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={buttonSx}
        disabled={disablingFields || isSubmitting}
        onClick={() => console.log("Button clicked")}
      >
        {success ? <CheckIcon /> : buttonText}
      </Button>
      {isSubmitting && (
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
