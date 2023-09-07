import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { CircularProgress, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
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

export default function PackageModal({ setHallPackage }) {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { setValue, control, handleSubmit } = useForm({
    defaultValues: {
      package_name: "",
      package_ar: "",
    },
  });
  const router = useRouter();

  const [id, setId] = React.useState("");
  React.useEffect(() => {
    if (!router.isReady) return;
    const params = router.query;
    if (params) {
      setId(params.EditHall);
    }
  }, [router.isReady, router.query]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangePackageName = (e) => {
    setValue("package_name", e.target.value);
  };
  const handleChangePackageAr = (e) => {
    setValue("package_ar", e.target.value);
  };

  const PackageData = () => {
    axios
      .get(`https://bh-qpxe.onrender.com:8080/api/v1/bh/weddinghall/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setHallPackage(
          response.data.data.data.wedding_infos.filter(
            (info) => info.tag === "package"
          )
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const { package_name, package_ar } = data;

    const formData = new FormData();

    formData.append("tag", "package");

    formData.append("value", `${package_name} - ${package_ar}`);

    formData.append("id_hall", id);

    try {
      const response = await axios.post(
        "https://bh-qpxe.onrender.com:8080/api/v1/bh/weddinghallinfo",
        formData,
        {
          withCredentials: true,
        }
      );
      PackageData();
      setOpen(false);
    } catch (error) {
      //   console.error(error.response.data.error.errors[0].message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>{t("addNewPackage")}</Button>
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
                name="package_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    {...field}
                    label={t("packageName")}
                    fullWidth
                    onChange={handleChangePackageName}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="package_ar"
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    {...field}
                    label={t("packageNameArabic")}
                    fullWidth
                    onChange={handleChangePackageAr}
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
                  t("addNewPackageButton")
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
