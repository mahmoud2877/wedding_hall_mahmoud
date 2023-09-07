import { Modal, Box, CircularProgress } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
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

export const ShowPackageForm = ({ packageName, onClose, setHallPackage }) => {
  const { t } = useTranslation();

  const router = useRouter();

  React.useEffect(() => {
    if (!router.isReady) return;
    const params = router.query;
    if (params) {
      setId(params.EditHall);
    }
  }, [router.isReady, router.query]);
  const [id, setId] = React.useState("");

  const [name_ar, setname_ar] = React.useState("");
  const [name_en, setname_en] = React.useState("");

  const [minGuest, setminGuest] = React.useState("");
  const [maxGuest, setmaxGuest] = React.useState("");

  const [personPrice, setpersonPrice] = React.useState("");
  const [persondiscount, setpersondiscount] = React.useState("");

  // const [totalPrice, settotalPrice] = React.useState("");
  const [mainDish, setmainDish] = React.useState("");
  const [dessertDish, setdessertDish] = React.useState("");
  const [drink, setdrink] = React.useState("");
  const [mainEvents, setmainEvents] = React.useState("");
  const [loadingName, setLoadingName] = React.useState(false);
  const [loadingMinGuest, setLoadingMinGuest] = React.useState(false);
  const [loadingMaxGuest, setLoadingMaxGuest] = React.useState(false);

  const [loadingPersonPrice, setLoadingPersonPrice] = React.useState(false);
  const [loadingPersondiscount, setLoadingPersondiscount] =
    React.useState(false);

  const [loadingMainDish, setLoadingMainDish] = React.useState(false);
  const [loadingDessertDish, setLoadingDessertDish] = React.useState(false);
  const [loadingDrink, setLoadingDrink] = React.useState(false);
  const [loadingMainEvents, setLoadingMainEvents] = React.useState(false);

  const packageData = () => {
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
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitname_ar = () => {
    setLoadingName(true);

    const data = {
      value: name_ar,
      tag: "name_ar",
      id_info: packageName.id,
    };

    axios
      .post(
        "https://bh-qpxe.onrender.com:8080/api/v1/bh/packagehallinfo",
        data,
        {
          withCredentials: true,
        }
      )

      .then((response) => {
        // return axios.patch(
        //   `https://bh-qpxe.onrender.com:8080/api/v1/bh/weddinghallinfo/${packageName.id}`,
        //   { value: data.value },
        //   {
        //     withCredentials: true,
        //   }
        // );
        handleSubmitname_en();
        handleSubmitnameValue();
        packageData();
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setLoadingName(false);
      });
  };
  const handleSubmitname_en = () => {
    setLoadingName(true);

    const data = {
      value: name_en,
      tag: "name_en",
      id_info: packageName.id,
    };

    axios
      .post(
        "https://bh-qpxe.onrender.com:8080/api/v1/bh/packagehallinfo",
        data,
        {
          withCredentials: true,
        }
      )

      .then((response) => {
        // return axios.patch(
        //   `https://bh-qpxe.onrender.com:8080/api/v1/bh/weddinghallinfo/${packageName.id}`,
        //   { value: data.value },
        //   {
        //     withCredentials: true,
        //   }
        // );
        // handleSubmitnameValue();
        // packageData();
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setLoadingName(false);
      });
  };
  const handleSubmitnameValue = () => {
    setLoadingName(true);
    const data = {
      value: `${name_ar} - ${name_en}`,
      // id_info: packageName.id,
    };

    axios
      .patch(
        `https://bh-qpxe.onrender.com:8080/api/v1/bh/weddinghallinfo/${packageName.id}`,
        data,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        packageData();
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setLoadingName(false);
      });
  };
  const handleSubmitminGuest = () => {
    setLoadingMinGuest(true);

    const data = {
      value: minGuest,
      tag: "minGuest",
      id_info: packageName.id,
    };

    axios
      .post(
        "https://bh-qpxe.onrender.com:8080/api/v1/bh/packagehallinfo",
        data,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        packageData();
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setLoadingMinGuest(false);
      });
  };
  const handleSubmitmaxGuest = () => {
    setLoadingMaxGuest(true);

    const data = {
      value: maxGuest,
      tag: "maxGuest",
      id_info: packageName.id,
    };

    axios
      .post(
        "https://bh-qpxe.onrender.com:8080/api/v1/bh/packagehallinfo",
        data,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        packageData();
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setLoadingMaxGuest(false);
      });
  };
  const handleSubmitpersonPrice = () => {
    setLoadingPersonPrice(true);
    const data = {
      value: personPrice,
      tag: "personprice",
      id_info: packageName.id,
    };

    axios
      .post(
        "https://bh-qpxe.onrender.com:8080/api/v1/bh/packagehallinfo",
        data,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        packageData();
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setLoadingPersonPrice(false);
      });
  };
  const handleSubmitpersondiscount = () => {
    setLoadingPersondiscount(true);
    const data = {
      value: persondiscount,
      tag: "persondiscount",
      id_info: packageName.id,
    };

    axios
      .post(
        "https://bh-qpxe.onrender.com:8080/api/v1/bh/packagehallinfo",
        data,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        packageData();
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setLoadingPersondiscount(false);
      });
  };

  // const totalPriceValue = personPrice * minGuest;

  // const handleSubmittotalPrice = () => {
  //   setLoadingTotalPrice(true);
  //   const data = {
  //     value: totalPriceValue,
  //     tag: "totalPrice",
  //     id_info: packageName.id,
  //   };

  //   axios
  //     .post("https://bh-qpxe.onrender.com:8080/api/v1/bh/packagehallinfo", data, {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       packageData();
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     })
  //     .finally(() => {
  //       setLoadingTotalPrice(false);
  //     });
  // };
  const handleSubmitmainDish = () => {
    setLoadingMainDish(true);
    const data = {
      value: mainDish,
      tag: "mainDish",
      id_info: packageName.id,
    };

    axios
      .post(
        "https://bh-qpxe.onrender.com:8080/api/v1/bh/packagehallinfo",
        data,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        packageData();
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setLoadingMainDish(false);
      });
  };
  const handleSubmitdessertDish = () => {
    setLoadingDessertDish(true);
    const data = {
      value: dessertDish,
      tag: "dessertDish",
      id_info: packageName.id,
    };

    axios
      .post(
        "https://bh-qpxe.onrender.com:8080/api/v1/bh/packagehallinfo",
        data,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        packageData();
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setLoadingDessertDish(false);
      });
  };
  const handleSubmitdrink = () => {
    setLoadingDrink(true);
    const data = {
      value: drink,
      tag: "drink",
      id_info: packageName.id,
    };

    axios
      .post(
        "https://bh-qpxe.onrender.com:8080/api/v1/bh/packagehallinfo",
        data,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        packageData();
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setLoadingDrink(false);
      });
  };
  const handleSubmitmainEvents = () => {
    setLoadingMainEvents(true);
    const data = {
      value: mainEvents,
      tag: "mainEvents",
      id_info: packageName.id,
    };

    axios
      .post(
        "https://bh-qpxe.onrender.com:8080/api/v1/bh/packagehallinfo",
        data,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        packageData();
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setLoadingMainEvents(false);
      });
  };
  React.useEffect(() => {
    const nameTags_ar = packageName?.package_infos.filter(
      (item) => item.tag === "name_ar" && item.exist === 1
    );

    const nameValues_ar = nameTags_ar?.map((item) => item.value);

    setname_ar(nameValues_ar);

    const nameTags_en = packageName?.package_infos.filter(
      (item) => item.tag === "name_en" && item.exist === 1
    );

    const nameValues_en = nameTags_en?.map((item) => item.value);

    setname_en(nameValues_en);

    const minGuestTags = packageName?.package_infos.filter(
      (item) => item.tag === "minGuest" && item.exist === 1
    );
    const minGuestValues = minGuestTags?.map((item) => item.value);

    setminGuest(minGuestValues);

    const maxGuestTags = packageName?.package_infos.filter(
      (item) => item.tag === "maxGuest" && item.exist === 1
    );
    const maxGuestValues = maxGuestTags?.map((item) => item.value);

    setmaxGuest(maxGuestValues);

    const personPriceTags = packageName?.package_infos.filter(
      (item) => item.tag === "personPrice" && item.exist === 1
    );

    const personPriceValues = personPriceTags?.map((item) => item.value);

    setpersonPrice(personPriceValues);

    const persondiscountTags = packageName?.package_infos.filter(
      (item) => item.tag === "persondiscount" && item.exist === 1
    );

    const persondiscountValues = persondiscountTags?.map((item) => item.value);

    setpersondiscount(persondiscountValues);

    // const totalPriceTags = packageName?.package_infos.filter(
    //   (item) => item.tag === "totalPrice" && item.exist === 1
    // );
    // const totalPriceValues = totalPriceTags?.map((item) => item.value);

    // settotalPrice(totalPriceValues);

    const mainDishTags = packageName?.package_infos.filter(
      (item) => item.tag === "mainDish" && item.exist === 1
    );
    const mainDishValues = mainDishTags?.map((item) => item.value);

    setmainDish(mainDishValues);

    const dessertTags = packageName?.package_infos.filter(
      (item) => item.tag === "dessertDish" && item.exist === 1
    );
    const dessertValues = dessertTags?.map((item) => item.value);

    setdessertDish(dessertValues);
    const drinkTags = packageName?.package_infos.filter(
      (item) => item.tag === "drink" && item.exist === 1
    );
    const drinkValues = drinkTags?.map((item) => item.value);

    setdrink(drinkValues);
    const mainEventsTags = packageName?.package_infos.filter(
      (item) => item.tag === "mainEvents" && item.exist === 1
    );
    const mainEventsValues = mainEventsTags?.map((item) => item.value);

    setmainEvents(mainEventsValues);
  }, [packageName]);

  return (
    <Modal open={Boolean(packageName)} onClose={onClose}>
      <Container component="main" maxWidth="xs" sx={style}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxHeight: "calc(100vh - 200px)",
            overflowY: "auto",
          }}
        >
          <Typography component="h1" variant="h5">
            {t("createPackage")}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={10}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name_ar"
                label={t("packageNameAr")}
                name="name_ar"
                autoComplete="name_ar"
                value={name_ar}
                onChange={(event) => setname_ar(event.target.value)}
                // {...register("name")}
                // error={Boolean(errors.name)}
                // helperText={errors.name?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="name_en"
                label={t("packageNameEn")}
                name="name_en"
                autoComplete="name_en"
                value={name_en}
                onChange={(event) => setname_en(event.target.value)}
                // {...register("name")}
                // error={Boolean(errors.name)}
                // helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
              <Button disabled={loadingName} onClick={handleSubmitname_ar}>
                {loadingName ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t("submitName")
                )}
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={10}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="min-guest"
                label={t("minGuest")}
                name="min-guest"
                autoComplete="min-guest"
                value={minGuest}
                onChange={(event) => setminGuest(event.target.value)}
              />
            </Grid>
            <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
              <Button disabled={loadingMinGuest} onClick={handleSubmitminGuest}>
                {loadingMinGuest ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t("submitMinGuest")
                )}
              </Button>
            </Grid>
          </Grid>{" "}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={10}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="max-guest"
                label={t("maxGuest")}
                name="max-guest"
                autoComplete="max-guest"
                value={maxGuest}
                onChange={(event) => setmaxGuest(event.target.value)}
              />
            </Grid>
            <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
              <Button disabled={loadingMaxGuest} onClick={handleSubmitmaxGuest}>
                {loadingMaxGuest ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t("submitMaxGuest")
                )}
              </Button>
            </Grid>
          </Grid>{" "}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={10}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="person-price"
                label={t("personPrice")}
                name="person-price"
                autoComplete="person-price"
                value={personPrice}
                onChange={(event) => setpersonPrice(event.target.value)}
              />
            </Grid>
            <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
              <Button
                disabled={loadingPersonPrice}
                onClick={handleSubmitpersonPrice}
              >
                {loadingPersonPrice ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t("submitPersonPrice")
                )}
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={10}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="person-discount"
                label={t("personDiscount")}
                name="person-discount"
                autoComplete="person-discount"
                value={persondiscount}
                onChange={(event) => setpersondiscount(event.target.value)}
              />
            </Grid>
            <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
              <Button
                disabled={loadingPersondiscount}
                onClick={handleSubmitpersondiscount}
              >
                {loadingPersondiscount ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t("submitPersonDiscount")
                )}
              </Button>
            </Grid>
          </Grid>
          {/* <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={10}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="total-price"
                label="total-price"
                name="total-price"
                autoComplete="total-price"
                value={totalPriceValue}
                // onChange={(event) => settotalPrice(event.target.value)}
              />
            </Grid>
            <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
              <Button
                disabled={loadingTotalPrice}
                onClick={handleSubmittotalPrice}
              >
                {loadingTotalPrice ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit Total Price"
                )}
              </Button>
            </Grid>
          </Grid> */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={10}>
              <TextField
                multiline
                margin="normal"
                required
                fullWidth
                id="mainDish"
                label={t("mainDish")}
                name="mainDish"
                autoComplete="mainDish"
                value={mainDish}
                onChange={(event) => setmainDish(event.target.value)}
              />
            </Grid>
            <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
              <Button disabled={loadingMainDish} onClick={handleSubmitmainDish}>
                {loadingMainDish ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t("submitMainDish")
                )}
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={10}>
              <TextField
                multiline
                margin="normal"
                required
                fullWidth
                id="dessertDish"
                label={t("dessertDish")}
                name="dessertDish"
                autoComplete="dessertDish"
                value={dessertDish}
                onChange={(event) => setdessertDish(event.target.value)}
              />
            </Grid>
            <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
              <Button
                disabled={loadingDessertDish}
                onClick={handleSubmitdessertDish}
              >
                {loadingDessertDish ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t("submitDessertDish")
                )}
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={10}>
              <TextField
                multiline
                margin="normal"
                required
                fullWidth
                id="drink"
                label={t("drink")}
                name="drink"
                autoComplete="drink"
                value={drink}
                onChange={(event) => setdrink(event.target.value)}
              />
            </Grid>
            <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
              <Button disabled={loadingDrink} onClick={handleSubmitdrink}>
                {loadingDrink ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t("submitDrink")
                )}
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={10}>
              <TextField
                multiline
                margin="normal"
                required
                fullWidth
                id="mainEvent"
                label={t("mainEvents")}
                name="mainEvent"
                autoComplete="mainEvent"
                value={mainEvents}
                onChange={(event) => setmainEvents(event.target.value)}
              />
            </Grid>
            <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
              <Button
                disabled={loadingMainEvents}
                onClick={handleSubmitmainEvents}
              >
                {loadingMainEvents ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t("submitMainEvents")
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Modal>
  );
};
