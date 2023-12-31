import React from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  List,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useRouter } from "next/router";
import ShowVideoModal from "../ShowVideoModal";
import ShowImageModal from "../ShowImageModal";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BasicRating from "../Rating";
import Love from "../Love";
import HallRating from "../HallRating";
import CommentSection from "../CommentSection";
import FavouriteContext from "../FavouriteContext";
import { ReservationModal } from "../ReservationModal";
import { t } from "i18next";
import { authContext } from "../AuthContext";
import ListSearch from "@/components/component/List";
import { searchContext } from "../SearchContext";
import MediaCard from "@/components/card/MediaCard";
import BasicCard from "@/components/cardPackage/CardPackage";

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
const HallPreview = () => {
  const [expanded, setExpanded] = React.useState(false);
  const { profile } = React.useContext(authContext);
  const { search, setSearch } = React.useContext(searchContext);
  const [showAllImages, setShowAllImages] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const imageSrc = "https://bh-qpxe.onrender.com:8080/public/halls/";
  const thumbSrc = "https://bh-qpxe.onrender.com:8080/public/thumbnail/";

  const [hallDesc, setHallDesc] = React.useState("");
  const [hallImages, setHallImages] = React.useState([]);
  const [hallthumb, setHallThumb] = React.useState([]);
  const [hallPackage, setHallPackage] = React.useState([]);
  const [hallComments, setHallComments] = React.useState([]);
  const [hallRate, setHallRate] = React.useState(0);
  const { setFavourite } = React.useContext(FavouriteContext);
  const [location, setLocation] = React.useState("");

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedVideo, setSelectedVideo] = React.useState(null);
  const [expandedPackage, setExpandedPackage] = React.useState(null);
  const [showImageModal, setShowImageModal] = React.useState(false);

  const router = useRouter();

  const [id, setId] = React.useState("");

  const handleOpenImageModal = () => {
    setShowImageModal(true);
  };

  React.useEffect(() => {
    if (!router.isReady) return;
    const params = router.query;
    if (params) {
      setId(params.HallPreview);
    }
  }, [router.isReady, router.query]);
  const handlePackageClick = (packageName) => {
    setExpandedPackage((prevExpandedPackage) =>
      prevExpandedPackage === packageName ? null : packageName
    );
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };
  const handleSeeMoreImages = () => {
    setShowAllImages(!showAllImages);
    setSelectedImage(null);
  };
  const handleCloseVideoModal = () => {
    setSelectedVideo(null);
  };
  React.useEffect(() => {
    if (!id) return;
    axios
      .get(`https://bh-qpxe.onrender.com:8080/api/v1/bh/weddinghall/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setHallRate(
          response.data.data.data.wedding_infos.find(
            (info) => info.tag === "rating"
          ).value
        );

        const locationString = response.data.data.data.location;
        const srcPattern = /src="(.*?)"/;
        const match = srcPattern.exec(locationString);
        const src = match ? match[1] : "";
        setLocation(src);
        setHallThumb(
          response.data.data.data.wedding_infos
            .filter((info) => info.tag === "subtitles")
            .map((info) => info)
        );
        setHallImages(
          response.data.data.data.wedding_infos
            .filter((info) => info.tag === "images")
            .map((info) => info)
        );
        setHallDesc(
          response.data.data.data.wedding_infos
            .filter((info) => info.tag === "description")
            .map((info) => info.value)
        );
        setHallPackage(
          response.data.data.data.wedding_infos.filter(
            (info) => info.tag === "package"
          )
        );
        setHallComments(
          response.data.data.data.reviews.filter(
            (review) => review.tag === "comment"
          )
        );

        const hallFavourite = response.data.data.data.reviews.find(
          (review) => review.tag === "Favourite"
        )?.value;

        setFavourite((prevFavourite) => ({
          ...prevFavourite,
          [id]: hallFavourite,
        }));
      })

      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
  console.log("heeeeeeeeeeeeeeeeeeere", search, "search");

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={12} spacing={1} sm={3}>
          <ListSearch search={search} />
          <Card
            sx={{
              marginLeft: "10px",
            }}
          >
            <CardMedia
              component="iframe"
              src={location}
              height="200"
              allowFullScreen
            />
          </Card>
        </Grid>
        <Grid item xs={8} sm={9} sx={{ p: "none", mt: -2 }}>
          <ImageList
            sx={{
              width: "90%",
              margin: "5px",
              height: hallImages.length > 0 ? "auto" : "auto",
            }}
            cols={3}
            rowHeight="auto"
          >
            {hallImages.length === 0 ? (
              <h3 style={{ margin: 20 }}>{t("hall_preview.no_images")}</h3>
            ) : (
              hallImages
                .slice(0, showAllImages ? hallImages.length : 5)
                .map((image, index) => (
                  <ImageListItem
                    key={image.id}
                    sx={{
                      gridColumn: index === 0 ? "span 2" : "auto", // Set span 2 for the first image
                      gridRow: index === 0 ? "span 2" : "auto", // Set span 2 for the first image
                    }}
                  >
                    <img
                      onClick={() =>
                        handleImageClick(`${imageSrc}${image.value}`)
                      }
                      src={`${imageSrc}${image.value}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${imageSrc}${image.value}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={image.value}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))
            )}
            {hallImages.length > 5 && !showAllImages && (
              <ImageListItem>
                <img
                  onClick={() =>
                    handleImageClick(`${imageSrc}${hallImages[5].value}`)
                  }
                  src={`${imageSrc}${hallImages[5].value}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${imageSrc}${hallImages[5].value}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={hallImages[5].value}
                  loading="lazy"
                />

                <ImageListItemBar
                  sx={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                  }}
                  title={hallImages.length - 6}
                  actionIcon={
                    <IconButton
                      // sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      onClick={handleOpenImageModal}
                    >
                      <AddIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            )}
            {showImageModal && (
              <ShowImageModal
                showImageModal={showImageModal}
                images={hallImages.map((image) => `${imageSrc}${image.value}`)}
                image={selectedImage}
                onClose={() => {
                  setSelectedImage(null);
                  setShowImageModal(false);
                }}
              />
            )}
          </ImageList>
          {/* <Card>
              <CardMedia
                component="iframe"
                src={location}
                height="450"
                allowFullScreen
              />
            </Card> */}
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <TextField
            multiline
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            label={t("hall_preview.description")}
            id="description"
            value={hallDesc}
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        display={"flex"}
        justifyContent={"center"}
        spacing={2}
        sx={{ mt: 2 }}
      >
        {hallPackage.map((packageName) => {
          return (
            <>
              <BasicCard
                packageName={packageName}
                key={packageName.id}
                profile={profile}
                id_hall={id}
                id_package={packageName.id}
              />
            </>
          );
        })}
      </Grid>
      {/* <Grid container direction="row" spacing={2} sx={{ mt: 2 }}> */}
      {/* </Grid> */}
      {profile ? (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <BasicRating />
          </Grid>
          <Grid item xs={6}>
            <Love />
          </Grid>
        </Grid>
      ) : null}

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <HallRating hallRate={hallRate} />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <CommentSection
            hallComments={hallComments}
            setHallComments={setHallComments}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default HallPreview;
