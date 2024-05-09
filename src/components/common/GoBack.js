import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function GoBack() {
  const navigate = useNavigate();

  return (
    <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
      Volver
    </Button>
  );
}
