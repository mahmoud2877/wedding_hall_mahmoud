import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import FavouriteContext from "./FavouriteContext";
import { useTranslation } from "react-i18next";

export default function IconCheckboxes() {
  const { t } = useTranslation();

  const router = useRouter();
  const [id, setId] = React.useState("");
  const { favourite, setFavourite } = React.useContext(FavouriteContext);

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
      .get(`https://bh-qpxe.onrender.com:8080/api/v1/bh/user/profile`, {
        withCredentials: true,
      })
      .then((response) => {
        const hallFavourite = response.data.data.data.reviews.find(
          (review) => review.tag === "Favourite" && review.id_hall == id
        )?.value;

        setFavourite((prevFavourite) => ({
          ...prevFavourite,
          [id]: hallFavourite || "0", // Default to "0" if not found
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, setFavourite]);

  const handleChange = (id) => (event) => {
    const isChecked = event.target.checked;

    setFavourite((prevFavourite) => ({
      ...prevFavourite,
      [id]: isChecked ? "1" : "0",
    }));
    if (!id) return;

    const data = {
      value: isChecked ? "1" : "0",
      tag: "Favourite",
      id_hall: id,
    };
    axios.post("https://bh-qpxe.onrender.com:8080/api/v1/bh/review", data, {
      withCredentials: true,
    });
  };
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend">{t("favourite")}</Typography>

      <Checkbox
        onChange={handleChange(id)}
        checked={favourite[id] === "1"}
        icon={
          <FavoriteBorder style={{ color: favourite[id] === "1" && "red" }} />
        }
        checkedIcon={
          <Favorite style={{ color: favourite[id] === "1" && "red" }} />
        }
        inputProps={{ "aria-label": "controlled" }}
      />
    </Box>
  );
}
