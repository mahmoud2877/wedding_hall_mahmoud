import * as React from "react";
import Box from "@mui/material/Box";
import Carousel from "react-material-ui-carousel";

function SwipeableTextMobileStepper({ mainHalls }) {
  const imageSrc = "http://127.0.0.1:8080/public/halls/";

  const images = [];
  for (const hall of mainHalls) {
    for (const weddingInfo of hall.wedding_infos) {
      if (weddingInfo.tag === "images") {
        images.push(weddingInfo.value);
      }
    }
  }

  return (
    <Box
      sx={{
        maxWidth: "100%",
        flexGrow: 1,
        p: 0,
        maxHeight: "25vh",
        minHeight: "25vh",
      }}
    >
      <Carousel
        style={{ width: "100%" }}
        indicatorIconButtonProps={{
          style: {
            display: "none", // Hide the dots indicators
          },
        }}
        indicatorContainerProps={{
          style: {
            marginTop: 0, // Remove any extra margin for the indicator container
          },
        }}
      >
        {images.map((step) => (
          <div
            key={step}
            style={{ Padding: 0, maxHeight: "25vh", minHeight: "25vh" }}
          >
            {/* <AspectRatio objectFit="contain"> */}
            <Box
              component="img"
              sx={{
                display: "block",
                // maxWidth: 400,
                overflow: "hidden",
                width: "100%",
                maxHeight: "25vh",
                minHeight: "25vh",
                p: 0,
                objectFit: "fill",
              }}
              src={`${imageSrc}${step}`}
              alt={step}
            />
            {/* </AspectRatio> */}
          </div>
        ))}
      </Carousel>
    </Box>
  );
}

export default SwipeableTextMobileStepper;
