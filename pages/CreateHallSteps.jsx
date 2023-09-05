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
import { Button, ButtonGroup, Grid } from "@mui/material";
import { Label } from "@mui/icons-material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#02a768",
    },
  },
});

export default function Checkout() {
  const { t } = useTranslation();
  const buttonLabels = [
    t("WeddingHall"),
    t("Photographer"),
    t("WeddingPlanner"),
    t("MakeupArtist"),
    t("DressesAndSuits"),
  ];

  const steps = [t("checkout.step1"), t("checkout.step2")];

  const [activeStep, setActiveStep] = React.useState(0);
  const [activeButton, setActiveButton] = React.useState(null);
  const [activeButtonName, setActiveButtonName] = React.useState(null);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleButtonClick = (index, label) => {
    setActiveButton(index);
    setActiveButtonName(label);
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <HallBasicInfo
            activeButtonName={activeButtonName}
            handleNext={handleNext}
          />
        );
      case 1:
        return <HallAdvancedInfo />;
      case 2:
        return;
      default:
        throw new Error("Unknown step");
    }
  }
  function getButtonVariant(index) {
    return index === activeButton ? "contained" : "outlined";
  }
  const buttonText = activeButton !== null && buttonLabels[activeButton];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={2}
          sx={{
            "@media (min-width: 600px)": {
              flexDirection: "row",
            },
          }}
        >
          <Grid item xs={12}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              sx={{
                height: "100%",
              }}
            >
              <ButtonGroup
                color="primary"
                aria-label="button group"
                sx={{
                  width: "100%",
                  flexDirection: "column",
                  gap: "8px",
                  "@media (min-width: 700px)": {
                    flexDirection: "row",
                  },
                }}
              >
                {buttonLabels.map((label, index) => (
                  <Button
                    key={index}
                    onClick={() => handleButtonClick(index, label)}
                    variant={getButtonVariant(index)}
                    sx={{
                      fontSize: "14px",
                      padding: "8px",
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>

        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            {buttonText}
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
