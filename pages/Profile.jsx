import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Alert, CircularProgress, Stack } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authContext } from "./AuthContext";
import { useTranslation } from "react-i18next";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#02a768",
    },
  },
});

export default function Profile() {
  const { t } = useTranslation();

  const userImage = "http://192.168.1.66:8080/public/img/users/";
  const [profileEdit, setProfileEdit] = React.useState("");
  const { setProfile } = React.useContext(authContext);
  const [error, setError] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState(null);
  const [selectedFileName, setSelectedFileName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [loadingPassword, setLoadingPassword] = React.useState(false);
  const schema = yup.object().shape({
    name: yup.string().required(t("nameRequired")),
    email: yup.string().required(t("emailRequired")).email(t("emailInvalid")),
  });

  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .required(t("passwordRequired"))
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, t("passwordInvalid")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], t("passwordsMustMatch"))
      .required(t("confirmPasswordRequired")),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      image: profileEdit.photo,
    },
  });
  React.useEffect(() => {
    const response = axios
      .get(`http://192.168.1.66:8080/api/v1/bh/user/profile`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.data.data);
        setProfileEdit(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setProfile, setProfileEdit]);

  React.useEffect(() => {
    if (profileEdit) {
      setValue("name", profileEdit.name || "");
      setValue("email", profileEdit.email || "");
      // setValue("image", profile.photo || "");
    }
  }, [profileEdit, profileEdit.email, profileEdit.name, setValue]);

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
      setProfileEdit((prevProfile) => ({
        ...prevProfile,
        photo: null,
      }));
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
    formData.append("image", data.image);
    axios
      .patch("http://192.168.1.66:8080/api/v1/bh/user/me", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        axios
          .get(`http://192.168.1.66:8080/api/v1/bh/user/profile`, {
            withCredentials: true,
          })
          .then((response) => {
            setProfile(response.data.data.data);
            setProfileEdit(response.data.data.data);
          });
      })
      .catch(function (response) {
        setError(response.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmitPasswords = (data) => {
    setLoadingPassword(true);

    const formData = new FormData();
    formData.append("password", data.password);
    formData.append("passwordConfirm", data.confirmPassword);
    axios
      .patch("http://192.168.1.66:8080/api/v1/bh/user/me", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {})
      .catch(function (response) {
        setError(response.response.data.message);
      })
      .finally(() => {
        setLoadingPassword(false);
      });
  };

  const password = React.useRef({});
  password.current = watch("password", "");

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
          <Typography component="h1" variant="h5">
            {t("profile.title")}
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  {...register("name")}
                  fullWidth
                  id="name"
                  label={t("profile.nameLabel")}
                  autoComplete="name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email")}
                  fullWidth
                  id="email"
                  label={t("profile.emailLabel")}
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  name="image"
                  style={{ display: "none" }}
                  {...register("image")}
                  value={""}
                  onChange={handleChange}
                  type="file"
                  accept="image/*"
                  id="image-input"
                />
                {selectedFileName && (
                  <label htmlFor="image-input">
                    <Typography variant="caption">
                      {selectedFileName}
                    </Typography>
                  </label>
                )}
                {imagePreview && !profileEdit?.photo && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ marginTop: "10px", width: "100%" }}
                  />
                )}
                {profileEdit?.photo && (
                  <img
                    src={`${userImage}${profileEdit.photo}`}
                    alt="Profile Image"
                    style={{ marginTop: "10px", width: "100%" }}
                  />
                )}
                <Button
                  variant="contained"
                  component="span"
                  onClick={handleUploadClick}
                  sx={{ mt: 2 }}
                >
                  {t("profile.imageUploadButton")}
                </Button>
              </Grid>
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
                t("profile.submitButton")
              )}
            </Button>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmitPassword(onSubmitPasswords)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...registerPassword("password")}
                  fullWidth
                  name="password"
                  label={t("profile.passwordLabel")}
                  type="password"
                  autoComplete="new-password"
                  error={!!errorsPassword.password}
                  helperText={errorsPassword.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...registerPassword("confirmPassword")}
                  fullWidth
                  name="confirmPassword"
                  label={t("profile.confirmPasswordLabel")}
                  type="password"
                  autoComplete="new-password"
                  error={!!errorsPassword.confirmPassword}
                  helperText={errorsPassword.confirmPassword?.message}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loadingPassword}
              >
                {loadingPassword ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t("profile.submitPasswordButton")
                )}
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
