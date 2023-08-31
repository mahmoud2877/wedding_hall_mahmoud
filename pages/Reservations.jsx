import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

import {
  Button,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function Reservations() {
  const router = useRouter();

  const [expanded, setExpanded] = React.useState(false);
  const [reservation, setReservation] = React.useState([]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [expandedPackage, setExpandedPackage] = React.useState(null);
  const handlePackageClick = (packageName) => {
    setExpandedPackage((prevExpandedPackage) =>
      prevExpandedPackage === packageName ? null : packageName
    );
  };

  React.useEffect(() => {
    axios
      .get("http://192.168.1.66:8080/api/v1/bh/reservation/me", {
        withCredentials: true,
      })
      .then((response) => {
        setReservation(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <Grid container direction="row" spacing={2} sx={{ mt: 2 }}>
      {reservation.map((packageName) => {
        return (
          <Grid direction="row" item xs={12} key={packageName.id}>
            <CardMedia
              sx={{ height: 140 }}
              image="http://192.168.1.66:8080/public/halls/hall--1692108995749-4.jpeg?w=164&h=164&fit=crop&auto=format"
              title="green iguana"
            />
            <Card onClick={() => handlePackageClick(packageName)}>
              <CardHeader
                title={`${packageName.wedding_hall.name} - ${
                  packageName.wedding_hall.wedding_infos.find(
                    (info) => info.tag === "package"
                  ).value
                }`}
              />
              {/* <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions> */}
              {/* <Collapse
                in={expandedPackage === packageName}
                timeout="auto"
                unmountOnExit
              > */}
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="h5">Package Data</Typography>

                    {packageName.wedding_hall.wedding_infos
                      .find((info) => info.tag === "package")
                      .package_infos.filter((info) => info.exist === 1)
                      .map((info) => (
                        <>
                          <Typography>
                            {`${info.tag} : ${info.value}`}
                          </Typography>
                        </>
                      ))}
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h5">Payment Data</Typography>
                    <Typography>
                      {`number_guest : ${packageName.number_guest}`}
                    </Typography>
                    <Typography>
                      {`payment_status : ${packageName.payment_status}`}
                    </Typography>
                    <Typography>
                      {`person_discount : ${packageName.person_discount}`}
                    </Typography>
                    <Typography>
                      {`person_final : ${packageName.person_final}`}
                    </Typography>
                    <Typography>
                      {`person_price : ${packageName.person_price}`}
                    </Typography>
                    <Typography>
                      {`totalfinal : ${packageName.totalfinal}`}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              {/* </Collapse> */}
            </Card>
            <Button
              onClick={() =>
                router.push(`/HallPreview/${packageName.wedding_hall.id}`)
              }
              variant="contained"
            >{` Go to ${packageName.wedding_hall.name}`}</Button>
          </Grid>
        );
      })}
    </Grid>
  );
}
