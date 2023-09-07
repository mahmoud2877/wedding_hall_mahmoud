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
import { useRouter } from "next/router";
import axios from "axios";
import { Alert, CircularProgress, Stack } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "@/components/navbar/Navbar";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#02a768",
    },
  },
});

export default function ForgetPassword({ t }) {
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [token, setToken] = React.useState("");
  const schema = yup.object().shape({
    password: yup
      .string()
      .required(t("passwordRequired"))
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, t("passwordInvalid")),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], t("passwordsMustMatch"))
      .required(t("confirmPasswordRequired")),
  });
  React.useEffect(() => {
    if (!router.isReady) return;
    const params = router.query;
    if (params) {
      setToken(params.ResetPassword);
    }
  }, [router.isReady, router.query]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setLoading(true);

    axios
      .post(
        `https://bh-qpxe.onrender.com:8080/api/v1/bh/user/resetpassword/${token}`,
        data,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setLoading(false);
        response.data.token ? router.push("/SignIn") : null;
        setSuccessMessage("You Changed Your password Succesfully");
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage("The Passwords not matched !");
      })
      .finally(() => {
        setLoading(false);
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
            {t("title")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("password", { required: true })}
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              label={t("password")}
              name="password"
              autoComplete="current-password"
              autoFocus
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              {...register("confirmpassword", {
                required: true,
                validate: (value) => value === password.current,
              })}
              margin="normal"
              required
              fullWidth
              type="password"
              id="confirmpassword"
              label={t("confirmPassword")}
              name="confirmpassword"
              autoComplete="current-password"
              error={!!errors.confirmpassword}
              helperText={errors.confirmpassword?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t("submitBtn")
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
