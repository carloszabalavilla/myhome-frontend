import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Breadcrumb() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MyHome
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="#"
        >
          Dashboard
        </Link>
        <Typography color="text.primary">Tareas</Typography>
      </Breadcrumbs>
    </div>
  );
}