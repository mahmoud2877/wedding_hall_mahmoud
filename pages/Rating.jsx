import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import axios from "axios";
import { useTranslation } from "react-i18next";
// import { authContext } from "./AuthContext";

export default function BasicRating() {
  // const { profile } = React.useContext(authContext);
  // const [newRate, setNewRate] = React.useState(0);
  const [rate, setRate] = React.useState(0);

  const getCurrentLanguage = () => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      return storedLanguage || router.locale;
    }
  };
  const { t } = useTranslation();
  const router = useRouter();
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    if (!router.isReady) return;
    const params = router.query;
    if (params) {
      setId(params.HallPreview);
    }
  }, [router.isReady, router.query]);
  React.useEffect(() => {
    if (!id) return;

    axios
      .get(`http://192.168.1.66:8080/api/v1/bh/user/profile`, {
        withCredentials: true,
      })
      .then((response) => {
        const profile = response.data.data.data;
        const targetReview = profile.reviews.find(
          (review) => review.tag === "rate" && review.id_hall == id
        );
        const rateForHall = targetReview ? parseInt(targetReview.value) : 0;
        setRate(rateForHall);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleRatingChange = (event, newValue) => {
    setRate(newValue);
    const data = {
      value: newValue,
      tag: "rate",
      id_hall: id,
    };
    axios
      .post("http://192.168.1.66:8080/api/v1/bh/review", data, {
        withCredentials: true,
      })
      .then((response) => {
        setRate(newValue);
      });
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        ...(getCurrentLanguage() === "ar" && {
          "& .MuiRating-root": {
            direction: "rtl",
          },
        }),
      }}
    >
      <Typography component="legend">{t("rate_us")}</Typography>
      <Rating
        size="large"
        name="simple-controlled"
        value={rate}
        onChange={handleRatingChange}
      />
    </Box>
  );
}
