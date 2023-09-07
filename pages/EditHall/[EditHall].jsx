import React from "react";
import {
  Card,
  CardMedia,
  Grid,
  ImageList,
  ImageListItem,
  TextField,
  Typography,
} from "@mui/material";
import ImageModal from "../imageModal";
import VideosModal from "../videosModal";
import DescriptionModal from "../descriptionModal";
import axios from "axios";
import { useRouter } from "next/router";
import ShowVideoModal from "../ShowVideoModal";
import ShowImageModal from "../ShowImageModal";
import PackageModal from "../PackageModal";
import CardContent from "@mui/material/CardContent";
import { ShowPackageForm } from "../ShowPackageForm";
import { useTranslation } from "react-i18next";
import ShowHallDate from "../showHallDate";
const EditHall = () => {
  const { t } = useTranslation();
  const imageSrc = "https://bh-qpxe.onrender.com:8080/public/halls/";
  const thumbSrc = "https://bh-qpxe.onrender.com:8080/public/thumbnail/";
  const router = useRouter();

  const [id, setId] = React.useState("");
  const [hallDesc, setHallDesc] = React.useState("");
  const [hallImages, setHallImages] = React.useState([]);
  const [hallthumb, setHallThumb] = React.useState([]);
  const [selectedVideo, setSelectedVideo] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [hallPackage, setHallPackage] = React.useState([]);
  const [selectedPackage, setSelectedPackage] = React.useState(null);
  const [location, setLocation] = React.useState("");
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handlePackageClick = (packageName) => {
    setSelectedPackage(packageName);
  };
  const handleClosePackageModal = () => {
    setSelectedPackage(null);
  };

  const handleCloseVideoModal = () => {
    setSelectedVideo(null);
  };
  React.useEffect(() => {
    if (!router.isReady) return;
    const params = router.query;
    if (params) {
      setId(params.EditHall);
    }
  }, [router.isReady, router.query]);
  React.useEffect(() => {
    axios
      .get(`https://bh-qpxe.onrender.com:8080/api/v1/bh/weddinghall/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
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
        const locationString = response.data.data.data.location;
        const srcPattern = /src="(.*?)"/;
        const match = srcPattern.exec(locationString);
        const src = match ? match[1] : "";
        setLocation(src);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      {location === "" ? null : (
        <Grid container width={"100%"} spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Card>
              <CardMedia
                component="iframe"
                src={location}
                height="450"
                allowFullScreen
              />
            </Card>
          </Grid>
        </Grid>
      )}

      <Grid container width={"81%"} spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={10}>
          <ImageList
            sx={{ width: "90%", height: "90%" }}
            cols={3}
            rowHeight={164}
          >
            {hallImages.length === 0 ? (
              <h3 style={{ margin: 20 }}> {t("add_image_prompt")}</h3>
            ) : (
              hallImages.map((image) => (
                <ImageListItem key={image.id}>
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
            <ShowImageModal
              image={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          </ImageList>
        </Grid>
        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
          <ImageModal setHallImages={setHallImages} />
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={10}>
            <ImageList
              sx={{ width: "100%", height: "100%" }}
              cols={4}
              style={{ height: "100%", overflow: "auto" }}
            >
              {hallthumb.length === 0 ? (
                <h3 style={{ margin: 20 }}>{t("add_videos_prompt")}</h3>
              ) : (
                hallthumb.map((videoThumb) => (
                  <ImageListItem key={videoThumb.id}>
                    <Card onClick={() => handleVideoClick(videoThumb.value)}>
                      <CardMedia
                        component="img"
                        src={`${thumbSrc}${videoThumb.value}`}
                        title={videoThumb.value}
                        autoPlay={false}
                        controls
                      />
                      <Typography variant="subtitle1">
                        {videoThumb.value}
                      </Typography>
                    </Card>
                  </ImageListItem>
                ))
              )}
              <ShowVideoModal
                video={selectedVideo}
                onClose={handleCloseVideoModal}
              />
            </ImageList>
          </Grid>
          <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
            <VideosModal setHallThumb={setHallThumb} />
          </Grid>
        </Grid>
      </Grid>

      <Grid container width={"81%"} spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={10}>
          {hallDesc === "" ? (
            <>
              <TextField
                multiline
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                label={t("description_label")}
                id="description"
                value={t("description_label")}
              />
            </>
          ) : (
            <TextField
              multiline
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              label={t("description_label")}
              id="description"
              value={hallDesc}
            />
          )}
        </Grid>
        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
          <DescriptionModal setHallDesc={setHallDesc} />
        </Grid>
      </Grid>
      <Grid container width={"81%"} spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <ShowHallDate hall_id={id} />
        </Grid>
      </Grid>
      <Grid container width={"81%"} spacing={2} sx={{ mt: 2 }}>
        {hallPackage.map((packageName) => {
          return (
            <Grid direction="column" item xs={10} key={packageName.id}>
              <Card onClick={() => handlePackageClick(packageName)}>
                <CardContent>
                  <Typography>{packageName.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
        <ShowPackageForm
          setHallPackage={setHallPackage}
          packageName={selectedPackage}
          onClose={handleClosePackageModal}
        />
        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
          <PackageModal setHallPackage={setHallPackage} />
        </Grid>
      </Grid>
    </>
  );
};

export default EditHall;
