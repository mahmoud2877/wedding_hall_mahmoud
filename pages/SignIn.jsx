import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useForm } from "react-hook-form";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Alert, CircularProgress, Stack } from "@mui/material";
import { authContext } from "./AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "next-i18next";
import Navbar from "@/components/navbar/Navbar";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#03a700",
    },
  },
});

export default function SignIn() {
  const { t } = useTranslation();
  const schema = yup.object().shape({
    // email: yup.string().required(t("emailRequired")).email(t("emailInvalid")),
    password: yup.string().required(t("passwordRequired")),
  });
  const { setProfile } = React.useContext(authContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const onSubmit = (data) => {
    setLoading(true);

    axios
      .post("http://192.168.1.66:8080/api/v1/bh/user/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.data.users, "response.data.data.use");
        setProfile(response.data.data.users);
        response.data.token ? router.push("/") : router.push("/SignIn");
      })
      .catch(function (error) {
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
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
          {error ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="error">
                {error}
              </Alert>
            </Stack>
          ) : null}

          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("signIn.title")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("email", { required: true })}
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("signIn.email")}
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register("password", { required: true })}
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("signIn.password")}
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t("signIn.signInBtn")
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <NextLink href="/ForgetPassword" variant="body2">
                  {t("signIn.forgotPassword")}
                </NextLink>
              </Grid>
              <Grid item>
                <NextLink href="/SignUp" variant="body2">
                  {t("signIn.signUp")}
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
