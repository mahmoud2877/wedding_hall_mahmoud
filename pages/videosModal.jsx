import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useRouter } from "next/router";
import { Alert, Stack, Typography } from "@mui/material";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";
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

export default function VideosModal({ setHallThumb }) {
  const { t } = useTranslation();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [videoPreview, setVideoPreview] = React.useState(null);
  const [videoName, setVideoName] = React.useState("");
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const { setValue, control, handleSubmit } = useForm({
    defaultValues: {
      video: "",
    },
  });
  const router = useRouter();

  const isVideo = (file) => {
    const acceptedTypes = ["video/mp4"];
    return acceptedTypes.includes(file.type);
  };

  React.useEffect(() => {
    if (!router.isReady) return;
    const params = router.query;
    if (params) {
      setId(params.EditHall);
    }
  }, [router.isReady, router.query]);

  const videosData = () => {
    axios
      .get(`http://127.0.0.1:8080/api/v1/bh/weddinghall/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setHallThumb(
          response.data.data.data.wedding_infos
            .filter((info) => info.tag === "subtitles")
            .map((info) => info)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const { video } = data;

    const formData = new FormData();
    formData.append("tag", "video");
    formData.append("video", video);
    formData.append("id_hall", id);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/v1/bh/weddinghallinfo/video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );
      videosData();

      setOpen(false);

      setValue("video", "");
      setVideoPreview(null);
      setVideoName("");
    } catch (response) {
      setError(response.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("video-input").click();
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (isVideo(file)) {
      setValue("video", file);
      setVideoPreview(URL.createObjectURL(file));
      setVideoName(file.name);
    }
  };
  return (
    <div style={{ margin: "25%" }}>
      <Button onClick={handleOpen}>{t("add_new_video_button")}</Button>
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
                name="video"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      style={{ display: "none" }}
                      {...field}
                      value={""}
                      onChange={handleChange}
                      accept="video/*"
                      type="file"
                      id="video-input"
                    />
                    <Button variant="contained" onClick={handleButtonClick}>
                      {t("select_video_button")}
                    </Button>
                    {videoName && (
                      <Typography variant="caption">{videoName}</Typography>
                    )}
                  </>
                )}
              />
            </Grid>
            {videoPreview && (
              <Grid item xs={12}>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">{t("video_preview")}:</Typography>
                  <video width="100%" controls>
                    <source src={videoPreview} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Box>
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
                  <CircularProgressWithLabel value={uploadProgress} />
                ) : (
                  t("add_new_video_button")
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
