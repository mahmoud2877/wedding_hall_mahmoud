import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReservationModal } from "@/pages/ReservationModal";
import "./mediacard.css";
import { Slider } from "@mui/material";

export default function MediaCard({
  packageName,
  profile,
  id_hall,
  id_package,
}) {
  console.log(packageName, "packageName", id_hall, id_package);
  let minGuest;
  let maxGuest;
  packageName.package_infos
    .filter((el) => el.tag.includes("minGuest"))
    .map((el) => {
      minGuest = el.value;
    });
  packageName.package_infos
    .filter((el) => el.tag.includes("maxGuest"))
    .map((el) => {
      maxGuest = el.value;
    });

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="http://192.168.1.66:8080/public/halls/hall--1692108995749-4.jpeg?w=164&h=164&fit=crop&auto=format"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {packageName.value}
        </Typography>
        <div className="packageBox">
          <Typography variant="body2" fontWeight={700} color="text.primary">
            {`Number of guest from ${minGuest} to ${maxGuest}`}
          </Typography>{" "}
        </div>
        <div className="packageBox">
          <Typography variant="body2" fontWeight={700} color="text.primary">
            {`Main Features`}
          </Typography>{" "}
        </div>

        {packageName.package_infos
          .filter((el) => !el.tag.startsWith("name"))
          .filter((el) => !el.tag.includes("discount"))
          .filter((el) => !el.tag.includes("Guest"))
          .filter((el) => !el.tag.includes("price"))
          .map((info) =>
            // if(info.includes("Gues"))
            {
              return (
                <div className="packageBox">
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="text.primary"
                  >
                    {`${info.tag} :`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${info.value}`}
                  </Typography>
                </div>
              );
            }
          )}
      </CardContent>
      <CardActions>
        <Button size="small">
          {" "}
          {profile && (
            <ReservationModal id_hall={id_hall} id_package={id_package} />
          )}
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
