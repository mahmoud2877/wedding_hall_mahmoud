import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
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

export default function DescriptionModal({ setHallDesc }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

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
      value: "",
    },
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    setValue("value", e.target.value);
  };

  const descriptionData = () => {
    axios
      .get(`https://bh-qpxe.onrender.com:8080/api/v1/bh/weddinghall/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setHallDesc(
          response.data.data.data.wedding_infos
            .filter((info) => info.tag === "description")
            .map((info) => info.value)
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const { value } = data;

    const formData = new FormData();

    formData.append("tag", "description");

    formData.append("value", value);

    formData.append("id_hall", id);

    try {
      const response = await axios.post(
        "https://bh-qpxe.onrender.com:8080/api/v1/bh/weddinghallinfo",
        formData,
        {
          withCredentials: true,
        }
      );
      descriptionData();
      setOpen(false);
    } catch (error) {
      console.error(error.response.data.error.errors[0].message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ margin: "25%" }}>
      <Button onClick={handleOpen}>{t("add_new_description_button")}</Button>
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
            <Grid item xs={12}>
              <Controller
                name="value"
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    {...field}
                    label={t("description_label")}
                    fullWidth
                    multiline
                    rows={4}
                    onChange={handleChange}
                  />
                )}
              />
            </Grid>
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
                  t("add_new_description_button")
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
