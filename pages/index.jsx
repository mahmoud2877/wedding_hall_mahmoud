import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";
import Carousal from "./Carousal";
// import MainHallsCarousal from "./MainHallsCarousal";
import Pagination from "./pagination";
import hallsContext from "./hall_filtered_hallsCotnext";
import PageContext from "./PageContext";
import FavouriteContext from "./FavouriteContext";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { authContext } from "./AuthContext";
// import Slide from "../components/slider/Slider";

const defaultTheme = createTheme();

function Home() {
  const { profile } = React.useContext(authContext);

  const { t } = useTranslation();

  const { page } = React.useContext(PageContext);
  const { favourite, setFavourite } = React.useContext(FavouriteContext);

  const { halls, setHalls, filteredHalls } = React.useContext(hallsContext);

  console.log(filteredHalls, "filteredHall");
  const router = useRouter();
  // const [mainHalls, setMainHalls] = React.useState([]);
  const [idHalls, setIdHalls] = React.useState([]);
  React.useEffect(() => {
    if (profile) {
      const params = {
        tag: "Favourite",
      };
      axios
        .get("http://192.168.1.66:8080/api/v1/bh/review/fav", {
          withCredentials: true,
          params,
        })
        .then((response) => {
          const favouritesObj = {};

          response.data.data.data.forEach((entr) => {
            if (entr.tag === "Favourite") {
              const { id_hall, value } = entr;
              favouritesObj[id_hall] = value;
            }
          });

          setIdHalls(favouritesObj);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [profile]);

  React.useEffect(() => {
    setFavourite(idHalls);
  }, [idHalls]);

  const handleFavoriteClick = (hallId) => (event) => {
    const isChecked = event.target.checked;
    if (!hallId) return;

    setFavourite((prevFavourite) => ({
      ...prevFavourite,
      [hallId]: isChecked ? "1" : "0",
    }));

    const data = {
      value: isChecked ? "1" : "0",
      tag: "Favourite",
      id_hall: hallId,
    };

    axios
      .post("http://192.168.1.66:8080/api/v1/bh/review", data, {
        withCredentials: true,
      })
      .then(() => {
        axios
          .get(`http://192.168.1.66:8080/api/v1/bh/user/profile`, {
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
      });
  };

  React.useEffect(() => {
    const params = {
      page: page,
    };
    axios
      .get("http://192.168.1.66:8080/api/v1/bh/weddinghall", {
        withCredentials: true,
        params,
      })
      .then((response) =>
        setHalls(
          response.data.data.data.filter(
            (hall) => hall.wedding_infos.length > 0
          )
        )
      );
  }, [page, setHalls]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {filteredHalls.length === 0 && halls.length === 0 && (
              <p>{t("home.noDataMessage")}</p>
            )}
            {halls.length > 0 && filteredHalls.length === 0
              ? halls.map((hall) => (
                  <Grid item key={hall.id} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      onClick={() => router.push(`/HallPreview/${hall.id}`)}
                    >
                      <CardMedia component="div">
                        <Carousal hall={hall} />
                      </CardMedia>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {hall.name}
                        </Typography>
                        <Typography>
                          {t("navbar.minGuest")} = {hall.min_guest} |{" "}
                          {t("navbar.maxGuest")}= {hall.max_guest}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {profile ? (
                          <Checkbox
                            onChange={handleFavoriteClick(hall.id)}
                            checked={favourite[hall.id] === "1"}
                            icon={
                              <FavoriteBorder
                                style={{
                                  color:
                                    favourite[hall.id] === "1"
                                      ? "red"
                                      : "default",
                                }}
                              />
                            }
                            checkedIcon={
                              <Favorite
                                style={{
                                  color:
                                    favourite[hall.id] === "1"
                                      ? "red"
                                      : "default",
                                }}
                              />
                            }
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        ) : null}

                        {/* <Button
                          onClick={() => router.push(`/HallPreview/${hall.id}`)}
                          size="small"
                        >
                          {t("home.view")}
                        </Button> */}
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              : filteredHalls.map((hall) => (
                  <Grid item key={hall.id} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      onClick={() => router.push(`/HallPreview/${hall.id}`)}
                    >
                      <CardMedia component="div">
                        <Carousal hall={hall} />
                      </CardMedia>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {hall.name}
                        </Typography>
                        <Typography>
                          {t("navbar.minGuest")} = {hall.min_guest} |{" "}
                          {t("navbar.maxGuest")}= {hall.max_guest}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {profile ? (
                          <Checkbox
                            onChange={handleFavoriteClick(hall.id)}
                            checked={favourite[hall.id] === "1"}
                            icon={
                              <FavoriteBorder
                                style={{
                                  color:
                                    favourite[hall.id] === "1"
                                      ? "red"
                                      : "default",
                                }}
                              />
                            }
                            checkedIcon={
                              <Favorite
                                style={{
                                  color:
                                    favourite[hall.id] === "1"
                                      ? "red"
                                      : "default",
                                }}
                              />
                            }
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        ) : null}

                        {/* <Button
                          onClick={() => router.push(`/HallPreview/${hall.id}`)}
                          size="small"
                        >
                          {t("home.view")}
                        </Button> */}
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
          </Grid>
        </Container>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            <Pagination />
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
export default Home;
