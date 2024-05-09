import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

const footer = ["React", "Material UI", "Contacto", "Acerca de"];

export default function Footer() {
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        backgroundColor: "primary.main",
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
                key={page}
                href={`/${page.toLowerCase()}`}
                sx={{
                  mx: 1,
                  color: "black",
                  ":hover": { color: "#ffcc80", fontWeight: 700 },
                }}
              >
                {page}
              </Button>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} mt>
          <Copyrigth />
        </Grid>
      </Grid>
    </Box>
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
