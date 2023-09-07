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
import { Controller, useForm } from "react-hook-form";
import NextLink from "next/link";
import axios from "axios";
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
      main: "#02a768",
    },
  },
});

export default function SignUp() {
  const { t } = useTranslation();
  const [error, setError] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState(null);
  const [selectedFileName, setSelectedFileName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const schema = yup.object().shape({
    name: yup.string().required(t("nameRequired")),
    // email: yup.string().required(t("emailRequired")).email(t("emailInvalid")),
    password: yup
      .string()
      .required(t("passwordRequired"))
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, t("passwordInvalid")),
    // phone: yup
    //   .string()
    //   .matches(/^01[0-9]{9}$/, t("validation.phone.matches"))
    //   .required(t("validation.phone.required")),
  });
  const router = useRouter();

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: "",
      phone: "",
    },
  });
  const { setProfile } = React.useContext(authContext);
  const isImage = (file) => {
    const acceptedTypes = ["image/jpeg", "image/png"];
    return acceptedTypes.includes(file.type);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (isImage(file)) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
      setSelectedFileName(file.name);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("image-input").click();
  };

  const onSubmit = (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", data.image);
    // formData.append("phone", data.phone);
    axios
      .post(
        "https://bh-qpxe.onrender.com:8080/api/v1/bh/user/signup",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setProfile(response.data.data.users);
        response.data.token ? router.push("/") : router.push("/SignUp");
      })
      .catch(function (response) {
        setError(response.response.data.message);
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
          {error ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="error">
                {error}
              </Alert>
            </Stack>
          ) : null}

          <Avatar sx={{ m: 1, bgcolor: "#02a768" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("signUp.title")}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      id="name"
                      label={t("signUp.name")}
                      name="name"
                      autoComplete="name"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      id="email"
                      label={t("signUp.email")}
                      name="email"
                      autoComplete="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      name="password"
                      label={t("signUp.password")}
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      name="phone"
                      label={t("signUp.phone")}
                      type="phone"
                      id="phone"
                      autoComplete="new-phone"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </Grid> */}
              {/* <Grid item xs={12}>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <input
                      style={{ display: "none" }}
                      {...field}
                      value={""}
                      onChange={handleChange}
                      type="file"
                      accept="image/*"
                      id="image-input"
                    />
                  )}
                />
                {selectedFileName && (
                  <label htmlFor="image-input">
                    <Typography variant="caption">
                      {selectedFileName}
                    </Typography>
                  </label>
                )}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ marginTop: "10px", width: "100%" }}
                  />
                )}
                <Button
                  variant="contained"
                  component="span"
                  onClick={handleUploadClick}
                  sx={{ mt: 2 }}
                >
                  {t("signUp.uploadImage")}
                </Button>
              </Grid> */}
            </Grid>
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
                t("signUp.button")
              )}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NextLink href="/SignIn">{t("signUp.signIn")}</NextLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
