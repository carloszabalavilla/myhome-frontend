import React from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

export const footer = [
  { text: "Terminos y condiciones", href: "/terms" },
  { text: "Contacto", href: "/contact" },
  { text: "Acerca de", href: "/about" },
];

export default function Footer() {
  const secColor = useTheme().palette.secondary.main;

  return (
    <Paper
      sx={{
        width: "100%",
        py: 2,
        mt: 5,
      }}
    >
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
          >
            {footer.map((page) => (
              <Button
                key={page.text}
                href={page.href}
                sx={{
                  mx: 1,
                  color: "black",
                  ":hover": { color: secColor, fontWeight: 700 },
                }}
              >
                {page.text}
              </Button>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} mt>
          <Copyrigth />
        </Grid>
      </Grid>
    </Paper>
  );
}

export function Copyrigth() {
  return (
    <Typography align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        MyHome
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
