import React from "react";
import { Modal, Box, CardMedia, ImageList, ImageListItem } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
  p: 4,
  overflowY: "scroll",
};

const ImageModal = ({ image, images, onClose, showImageModal }) => {
  const [isCarouselVisible, setIsCarouselVisible] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(null);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsCarouselVisible(true);
  };

  const handleCloseCarousel = () => {
    setIsCarouselVisible(false);
  };
  return (
    <Modal open={Boolean(image) || showImageModal} onClose={onClose}>
      <Box sx={style}>
        {isCarouselVisible && (
          <Carousel
            index={selectedImageIndex}
            onChange={(index) => setSelectedImageIndex(index)}
          >
            {images &&
              images.map((img, index) => (
                <ImageListItem key={index}>
                  <CardMedia
                    // sx={{ maxWidth: "100%", m: 5, maxHeight: "50%" }}
                    component="img"
                    src={`${img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={`Image ${index}`}
                    loading="lazy"
                    style={{ width: "100%", maxHeight: "calc(80vh - 20vh)" }}
                    onClick={() => handleImageClick(index)}
                    sx={{ objectFit: "fill" }}
                  />
                </ImageListItem>
              ))}
          </Carousel>
        )}
        {/* <CardMedia
          component="img"
          src={image}
          alt="Image"
          style={{ width: "100%", height: "100%" }}
        /> */}
        <ImageList cols={4} variant="masonry" gap={8}>
          {!images ? (
            <ImageListItem>
              <CardMedia
                component="img"
                src={image}
                alt="Image"
                style={{ width: "100%", height: "100%" }}
              />
            </ImageListItem>
          ) : (
            images.map((img, index) => (
              <ImageListItem key={index}>
                <img
                  onClick={() => handleImageClick(index)}
                  src={`${img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={img}
                  loading="lazy"
                />
              </ImageListItem>
            ))
          )}
        </ImageList>
      </Box>
    </Modal>
  );
};

export default ImageModal;
