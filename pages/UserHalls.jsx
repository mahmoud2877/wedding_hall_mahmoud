import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useRouter } from "next/router";
import IdContext from "./IdContext.jsx";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";

const defaultTheme = createTheme();

export default function UserHalls() {
  const { t } = useTranslation();

  const { setId } = React.useContext(IdContext);

  const router = useRouter();

  const [halls, setHalls] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://bh-qpxe.onrender.com:8080/api/v1/bh/user/myhalls", {
        withCredentials: true,
      })
      .then((response) => {
        setHalls(response.data.data.data.wedding_halls);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 5,
                  border: 1,
                  borderColor: "#a6d4fa",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardActions sx={{ justifyContent: "center" }}>
                  <Tooltip title={t("user_halls.add_hall")}>
                    <IconButton
                      size="large"
                      onClick={() => router.push("/CreateHallSteps")}
                    >
                      <AddOutlinedIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
            {halls.map((hall) => (
              <Grid item key={hall.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {hall.name}
                    </Typography>
                    <Typography>
                      {hall.min_guest} - {hall.max_guest}
                    </Typography>
                    <Typography>{hall.status}</Typography>
                  </CardContent>
                  <CardActions>
                    {hall.status === "primary" ? (
                      <Button
                        size="small"
                        onClick={() => {
                          setId(hall.id);
                          router.push("/HallAdvancedInfo");
                        }}
                      >
                        {t("user_halls.complete_hall_data")}
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        onClick={() => router.push(`/EditHall/${hall.id}`)}
                      >
                        {t("user_halls.view_edit")}
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
