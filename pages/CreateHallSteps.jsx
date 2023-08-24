import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HallBasicInfo from "./HallBasicInfo";
import HallAdvancedInfo from "./HallAdvancedInfo";
import { useTranslation } from "react-i18next";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#03a700",
    },
  },
});

export default function Checkout() {
  const { t } = useTranslation();
  const steps = [t("checkout.step1"), t("checkout.step2")];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <HallBasicInfo handleNext={handleNext} />;
      case 1:
        return <HallAdvancedInfo />;
      case 2:
        return;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            {t("checkout.createHall")}
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your Registration.
              </Typography>
            </React.Fragment>
          ) : (
            getStepContent(activeStep)
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
