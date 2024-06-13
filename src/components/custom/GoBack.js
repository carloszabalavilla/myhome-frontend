import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function GoBack() {
  const navigate = useNavigate();

  return (
    <Button variant="contained" color="secondary" onClick={() => navigate("/")} sx={{mt:5}}>
      Volver
    </Button>
  );
}
