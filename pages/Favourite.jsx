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
import { useTranslation } from "react-i18next";
import { authContext } from "./AuthContext";

const defaultTheme = createTheme();

export default function Favourite() {
  const { t } = useTranslation();

  const router = useRouter();

  const [halls, setHalls] = React.useState([]);
  const { profile } = React.useContext(authContext);

  React.useEffect(() => {
    if (profile) {
      const params = {
        tag: "Favourite",
      };
      axios
        .get("http://127.0.0.1:8080/api/v1/bh/review/fav", {
          withCredentials: true,
          params,
        })
        .then((response) => {
          setHalls(response.data.data.data.map((item) => item.wedding_hall));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [profile]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
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
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => router.push(`/HallPreview/${hall.id}`)}
                    >
                      {t("home.view")}
                    </Button>
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
