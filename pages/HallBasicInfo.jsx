import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { Autocomplete, Button, CircularProgress } from "@mui/material";
import AdressSelectCountry from "./AddresSelectCountry.jsx";
import AddressSelectGoverorate from "./AddressSelectGovernorate.jsx";
import AddressSelectCity from "./AddressSelectCity.jsx";
import IdContext from "./IdContext.jsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

export default function AddressForm({ handleNext, activeButtonName }) {
  const methods = useForm();
  const { t } = useTranslation();
  const validationSchema = yup.object().shape({
    name: yup.string().required(t("validation.name.required")),
    location: yup.string().required(t("validation.location.required")),
    // country: yup.string().required("Country is required"),
    // governorate: yup.string().required("Governorate is required"),
    // city: yup.string().required("City is required"),
    adress: yup.string().required(t("validation.adress.required")),
    phone: yup
      .string()
      .matches(/^01[0-9]{9}$/, t("validation.phone.matches"))
      .required(t("validation.phone.required")),
    min_guest:
      activeButtonName === "WeddingHall" &&
      yup
        .number()
        .required(t("validation.min_guest.required"))
        .typeError(t("validation.min_guest.typeError")),
    max_guest:
      activeButtonName === "WeddingHall" &&
      yup
        .number()
        .required(t("validation.max_guest.required"))
        .typeError(t("validation.max_guest.typeError")),

    feature: yup.string(),
  });

  const [governorateData, setGovernorateData] = React.useState([]);
  const [citiesData, setCitiesData] = React.useState([]);
  const { setId } = React.useContext(IdContext);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      location: "",
      country: "",
      governorate: "",
      city: "",
      adress: "",
      phone: "",
      // min_guest: "",
      // max_guest: "",
      feature: "",
    },
  });
  if (activeButtonName === "WeddingHall") {
    setValue("min_guest", "");
    setValue("max_guest", "");
  }

  React.useEffect(() => {
    axios
      .get("https://bh-qpxe.onrender.com:8080/api/v1/bh/governorate", {
        withCredentials: true,
      })
      .then((response) => {
        setGovernorateData(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleParent = React.useCallback(
    async (event, value) => {
      if (value) {
        setValue(
          "governorate",
          `${value.governorate_name_en} -- ${value.governorate_name_ar}`
        );
        try {
          const response = await axios.get(
            `https://bh-qpxe.onrender.com:8080/api/v1/bh/cities/?governorate_id=${value.id}`,
            {
              withCredentials: true,
            }
          );
          setCitiesData(response.data.data.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        setCitiesData([]);
      }
    },
    [setValue]
  );

  const handleCountry = React.useCallback(
    (event, value) => {
      if (value) {
        setValue("country", value.label);
      }
    },
    [setValue]
  );

  const handleCitiesValue = React.useCallback(
    (event, value) => {
      if (value) {
        setValue("city", `${value.city_name_en} -- ${value.city_name_ar}`);
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data, "dataBefore");

    if (additionalFields.length > 0) {
      additionalFields.map((el, index) => {
        data[`feature${index}`] = el;
      });
    }
    data.hall_type = activeButtonName;
    console.log(data, "dataBefore");
    axios
      .post("https://bh-qpxe.onrender.com:8080/api/v1/bh/weddinghall", data, {
        withCredentials: true,
      })
      .then((response) => {
        setId(response.data.data.data.id);
        handleNext();
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [additionalFields, setAdditionalFields] = React.useState([]);

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, ""]);
  };

  const handleAdditionalFieldChange = (index, value) => {
    const updatedFields = [...additionalFields];
    updatedFields[index] = value;
    setAdditionalFields(updatedFields);
  };
  console.log(additionalFields, "additionalField");

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {t("hallInfo.title")}
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                {...register("name")}
                // required
                id="name"
                name="name"
                label={t("hallInfo.name")}
                fullWidth
                autoComplete="name"
                variant="standard"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("location")}
                // required
                id="location"
                name="location"
                label={t("hallInfo.location")}
                fullWidth
                autoComplete="location"
                variant="standard"
                error={!!errors.location}
                helperText={errors.location?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AdressSelectCountry
                name="country"
                label={t("hallInfo.country")}
                id="country"
                handleCountry={handleCountry}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AddressSelectGoverorate
                name="governorate"
                label={t("hallInfo.governorate")}
                id="governorate"
                options={governorateData}
                handleParent={handleParent}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AddressSelectCity
                name="city"
                label={t("hallInfo.city")}
                id="city"
                options={citiesData}
                handleCity={handleCitiesValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("adress")}
                // required
                id="adress"
                name="adress"
                label={t("hallInfo.adress")}
                fullWidth
                autoComplete="adress"
                variant="standard"
                error={!!errors.adress}
                helperText={errors.adress?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("phone")}
                required
                id="phone"
                name="phone"
                label={t("hallInfo.phone")}
                fullWidth
                autoComplete="phone"
                variant="standard"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
            {activeButtonName === "WeddingHall" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("min_guest")}
                    required={activeButtonName === "WeddingHall"}
                    id="min_guest"
                    name="min_guest"
                    label={t("hallInfo.minGuest")}
                    fullWidth
                    autoComplete="min_guest"
                    variant="standard"
                    error={!!errors.min_guest}
                    helperText={errors.min_guest?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("max_guest")}
                    required={activeButtonName === "WeddingHall"}
                    id="max_guest"
                    name="max_guest"
                    label={t("hallInfo.maxGuest")}
                    fullWidth
                    autoComplete="max_guest"
                    variant="standard"
                    error={!!errors.max_guest}
                    helperText={errors.max_guest?.message}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={[
                  "wedding",
                  "photosession",
                  "conference",
                  "graduation",
                ]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("feature")}
                    {...register("feature")}
                  />
                )}
                onInputChange={(event, value) => {
                  console.log(value, "featureValue");
                  setValue("feature", value);
                }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              {/* <Autocomplete
                options={["indoor", "outdoor", "villa", "session"]}
                renderInput={(params) => ( 
              <TextField
                // {...params}
                label="Feature"
                // {...register("feature")}
              />
              {/* //   )}
              //   onInputChange={(event, value) => {
              //     console.log(value, "valuevalue");
              //     setValue("feature", value);
              //   }}
              // /> 
            </Grid> */}

            {additionalFields.map((fieldValue, index) => (
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  key={index}
                  options={[
                    "wedding",
                    "photosession",
                    "conference",
                    "graduation",
                  ]}
                  value={fieldValue}
                  onChange={(_, value) =>
                    handleAdditionalFieldChange(index, value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Additional Field ${index + 1}`}
                      // {...register("additionalField")}
                    />
                  )}
                />
              </Grid>
            ))}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button variant="text" onClick={handleAddField}>
                Show Additional Field
              </Button>
              <Button variant="contained" type="submit" disabled={loading}>
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t("hallInfo.submit")
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </React.Fragment>
  );
}
