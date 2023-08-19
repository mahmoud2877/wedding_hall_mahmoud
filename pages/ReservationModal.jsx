import { Modal, Box, CircularProgress, Stack, Alert } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

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

export const ReservationModal = ({ id_hall, id_package }) => {
  const { t } = useTranslation();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { control, handleSubmit } = useForm();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [occupiedDates, setOccupiedDates] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    fetchOccupiedDates();
  }, []);

  const fetchOccupiedDates = async () => {
    if (!id_hall) return;

    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/api/v1/bh/reservation?id_hall=${id_hall}`,
        {
          withCredentials: true,
        }
      );
      const data = response.data.data.data;
      const occupiedDates = data.map((item) => item.effect_date);
      setOccupiedDates(occupiedDates);
    } catch (error) {
      console.error("Error fetching data from the API:", error);
      setError("Error fetching occupied dates.");
    }
  };

  const onSubmit = async (data) => {
    const { numberGuest, effect_date } = data;
    const date = new Date(effect_date.$d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
    const formInput = {
      id_package: id_package,
      id_hall: id_hall,
      numberGuest: numberGuest,
      effect_date: formattedDate,
    };
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/v1/bh/reservation",
        formInput,
        {
          withCredentials: true,
        }
      );

      setOpen(false);
      router.push("/Reservations");
    } catch (response) {
      setError(response.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>{t("create_reservation")}</Button>

      <Modal open={open} onClose={handleClose}>
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
                name="numberGuest"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    id="numberGuest"
                    label={t("number_guest_label")}
                    autoComplete="numberGuest"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="effect_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label={t("date")}
                    value={field.value || null}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    shouldDisableDate={(date) => {
                      const formattedDate = date.format("YYYY-MM-DD");
                      return occupiedDates.includes(formattedDate);
                    }}
                    disablePast
                    format="YYYY-MM-DD"
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
                  t("make_reservation")
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};
