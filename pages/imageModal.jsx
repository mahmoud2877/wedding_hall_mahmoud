import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useRouter } from "next/router";
import { Alert, CircularProgress, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ImagesModal({ setHallImages }) {
  const { t } = useTranslation();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [imagePreviews, setImagePreviews] = React.useState([]);
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const router = useRouter();

  const handleUploadClick = () => {
    document.getElementById("image-input").click();
  };

  const isImage = (file) => {
    const acceptedTypes = ["image/jpeg", "image/png"];
    return acceptedTypes.includes(file.type);
  };

  const [id, setId] = React.useState("");
  React.useEffect(() => {
    if (!router.isReady) return;
    const params = router.query;
    if (params) {
      setId(params.EditHall);
    }
  }, [router.isReady, router.query]);

  const { setValue, control, handleSubmit } = useForm({
    defaultValues: {
      images: [],
    },
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const imagesData = () => {
    axios
      .get(`http://192.168.1.66:8080/api/v1/bh/weddinghall/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setHallImages(
          response.data.data.data.wedding_infos
            .filter((info) => info.tag === "images")
            .map((info) => info)
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files).filter(isImage);

    setValue("images", files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);

    setSelectedFiles(files);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const { images } = data;

    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    formData.append("tag", "images");

    formData.append("id_hall", id);

    try {
      const response = await axios.post(
        "http://192.168.1.66:8080/api/v1/bh/weddinghallinfo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      imagesData();

      setOpen(false);

      setValue("images", []);
      setImagePreviews([]);
      setSelectedFiles([]);
    } catch (response) {
      setError(response.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "25%" }}>
      <Button onClick={handleOpen}>{t("add_new_image_button")}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={({ mt: 3 }, style)}
        >
          <Grid container spacing={2}>
            {error ? (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert variant="filled" severity="error">
                  {error}
                </Alert>
              </Stack>
            ) : null}

            <Grid item xs={12}>
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <input
                    multiple
                    {...field}
                    value={""}
                    onChange={handleChange}
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    id="image-input"
                  />
                )}
              />
              <Button
                variant="contained"
                component="span"
                onClick={handleUploadClick}
                sx={{ mt: 2 }}
              >
                {t("upload_image_button")}
              </Button>
            </Grid>
            {selectedFiles.length > 0 && (
              <Grid item xs={12}>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">
                    {t("hall_advanced_info.selected_files")}
                  </Typography>
                  <ul>
                    {selectedFiles.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </Box>
              </Grid>
            )}

            {imagePreviews.length > 0 && (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {imagePreviews.map((preview, index) => (
                    <Grid item key={index} xs={4}>
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
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
                  t("add_new_images_button")
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
