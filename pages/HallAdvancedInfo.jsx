import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  styled,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import IdContext from "./IdContext";
import { useTranslation } from "react-i18next";

const StyledFileInput = styled("input")({
  display: "none",
});

export default function HallAdvancedInfo() {
  const { t } = useTranslation();

  const [error, setError] = React.useState("");
  const [loading, setLoading] = useState(false);

  const { id } = React.useContext(IdContext);
  const [commercialRecordFiles, setCommercialRecordFiles] = useState([]);
  const [taxRecordFiles, setTaxRecordFiles] = useState([]);
  const [personalIdFiles, setPersonalIdFiles] = useState([]);

  const { handleSubmit } = useForm();
  const router = useRouter();

  const isImageOrPDF = (file) => {
    const acceptedTypes = ["image/jpeg", "image/png", "application/pdf"];
    return acceptedTypes.includes(file.type);
  };

  const handleChangeFile = (fieldName, setter) => (e) => {
    const files = Array.from(e.target.files).filter(isImageOrPDF);

    setter(files);
  };

  const onSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id_hall", id);

    commercialRecordFiles.forEach((file) => {
      formData.append("commercial_record", file);
    });

    taxRecordFiles.forEach((file) => {
      formData.append("tax_record", file);
    });

    personalIdFiles.forEach((file) => {
      formData.append("personal_id", file);
    });

    axios
      .post(
        "https://bh-qpxe.onrender.com:8080/api/v1/bh/weddinghallinfo/pdf",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        router.push("/UserHalls");
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {t("hall_advanced_info.title")}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={4}>
          {error ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="error">
                {error}
              </Alert>
            </Stack>
          ) : null}
          <Grid item xs={12}>
            <label htmlFor="commercial-record-input">
              <Button variant="contained" component="span">
                {t("hall_advanced_info.upload_commercial_record")}
              </Button>
              <StyledFileInput
                id="commercial-record-input"
                multiple
                onChange={handleChangeFile(
                  "commercial_record",
                  setCommercialRecordFiles
                )}
                type="file"
                accept="image/*,application/pdf"
                required
              />
            </label>
            {commercialRecordFiles.length > 0 && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body2">
                  {" "}
                  {t("hall_advanced_info.selected_files")}
                </Typography>
                {commercialRecordFiles.map((file, index) => (
                  <div key={index}>
                    {file.type.includes("image") ? (
                      <>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Commercial Record ${index}`}
                          height={100}
                        />
                        <Typography variant="body2">{file.name}</Typography>
                      </>
                    ) : (
                      <Typography variant="body2">PDF: {file.name}</Typography>
                    )}
                  </div>
                ))}
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <label htmlFor="tax-record-input">
              <Button variant="contained" component="span">
                {t("hall_advanced_info.upload_tax_record")}
              </Button>
              <StyledFileInput
                id="tax-record-input"
                multiple
                onChange={handleChangeFile("tax_record", setTaxRecordFiles)}
                type="file"
                accept="image/*,application/pdf"
                required
              />
            </label>
            {taxRecordFiles.length > 0 && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body2">
                  {" "}
                  {t("hall_advanced_info.selected_files")}
                </Typography>
                {taxRecordFiles.map((file, index) => (
                  <div key={index}>
                    {file.type.includes("image") ? (
                      <>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Tax Record ${index}`}
                          height={100}
                        />
                        <Typography variant="body2">{file.name}</Typography>
                      </>
                    ) : (
                      <Typography variant="body2">PDF: {file.name}</Typography>
                    )}
                  </div>
                ))}
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <label htmlFor="personal-id-input">
              <Button variant="contained" component="span">
                {t("hall_advanced_info.upload_personal_id")}
              </Button>
              <StyledFileInput
                id="personal-id-input"
                multiple
                onChange={handleChangeFile("personal_id", setPersonalIdFiles)}
                type="file"
                accept="image/*,application/pdf"
                required
              />
            </label>
            {personalIdFiles.length > 0 && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body2">
                  {t("hall_advanced_info.selected_files")}
                </Typography>
                {personalIdFiles.map((file, index) => (
                  <div key={index}>
                    {file.type.includes("image") ? (
                      <>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Personal ID ${index}`}
                          height={100}
                        />
                        <Typography variant="body2">{file.name}</Typography>
                      </>
                    ) : (
                      <Typography variant="body2">PDF: {file.name}</Typography>
                    )}
                  </div>
                ))}
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t("hall_advanced_info.submit")
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
