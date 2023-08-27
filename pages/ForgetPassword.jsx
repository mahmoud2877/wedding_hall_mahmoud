import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Alert, CircularProgress, Stack } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "@/components/navbar/Navbar";
import { useTranslation } from "next-i18next";
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#02a768",
    },
  },
});

export default function ForgetPassword() {
  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [disableSubmit, setDisableSubmit] = React.useState(false);
  const { t } = useTranslation();
  const schema = yup.object().shape({
    email: yup.string().required(t("emailRequired")).email(t("emailInvalid")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    setLoading(true);

    setSuccessMessage("");
    setErrorMessage("");
    axios
      .post("http://192.168.1.66:8080/api/v1/bh/user/forgetpassword", data)
      .then((response) => {
        setDisableSubmit(true);

        setLoading(false);
        setSuccessMessage("Please check your email and click the link");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <Navbar /> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* {" "}
          {disableSubmit ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="success">
                Please check your email and click the link
              </Alert>
            </Stack>
          ) : null} */}
          {successMessage && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="success">
                {successMessage}
              </Alert>
            </Stack>
          )}

          {errorMessage && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="error">
                {errorMessage}
              </Alert>
            </Stack>
          )}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("forgetPassword.title")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("email")}
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("forgetPassword.email")}
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Button
              disabled={loading || disableSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t("forgetPassword.button")
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
