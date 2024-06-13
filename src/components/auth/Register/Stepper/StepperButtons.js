import { Button, Grid } from "@mui/material";

export function FormButtons(props) {
  const { buttonText, activeStep, _handleBack, disablingFields } = props;
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        {activeStep !== 0 && (
          <Button onClick={_handleBack} sx={{ mt: 3, ml: 1 }}>
            Atrás
          </Button>
        )}
      </Grid>
      <Grid item>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={disablingFields}
          sx={{ mt: 3, ml: 1 }}
        >
          {buttonText}
        </Button>
      </Grid>
    </Grid>
  );
}
