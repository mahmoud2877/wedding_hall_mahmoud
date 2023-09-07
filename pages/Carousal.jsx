import * as React from "react";
import Box from "@mui/material/Box";
import Carousel from "react-material-ui-carousel";

function SwipeableTextMobileStepper({ hall }) {
  const imageSrc = "https://bh-qpxe.onrender.com:8080/public/halls/";

  const images = hall?.wedding_infos
    .filter((info) => info.tag === "images")
    .map((info) => info.value);

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Carousel>
        {images.map((step) => (
          <div key={step}>
            <Box
              component="img"
              sx={{
                height: 255,
                display: "block",
                maxWidth: 400,
                overflow: "hidden",
                width: "100%",
              }}
              src={`${imageSrc}${step}`}
              alt={step.label}
            />
          </div>
        ))}
      </Carousel>
    </Box>
  );
}

export default SwipeableTextMobileStepper;
