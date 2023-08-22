import * as React from "react";

import {
  Divider,
  Avatar,
  Grid,
  Paper,
  TextField,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { authContext } from "./AuthContext";

const userImage = "http://192.168.1.66:8080/public/img/users/";

function CommentSection({ hallComments, setHallComments }) {
  const { profile } = React.useContext(authContext);

  const { t } = useTranslation();

  const [comment, setComment] = React.useState("");
  const router = useRouter();
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    if (!router.isReady) return;
    const params = router.query;
    if (params) {
      setId(params.HallPreview);
    }
  }, [router.isReady, router.query]);

  const handleSubmit = () => {
    const data = {
      value: comment,
      tag: "comment",
      id_hall: id,
    };
    axios
      .post("http://192.168.1.66:8080/api/v1/bh/review", data, {
        withCredentials: true,
      })
      .then((response) =>
        axios
          .get(`http://192.168.1.66:8080/api/v1/bh/weddinghall/${id}`, {
            withCredentials: true,
          })
          .then((response) => {
            setHallComments(
              response.data.data.data.reviews.filter(
                (review) => review.tag === "comment"
              )
            );
          })
      );

    setComment("");
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      {profile ? (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              placeholder={t("add_comment_placeholder")}
              id="outlined-multiline-flexible"
              label={t("add_comment_label")}
              multiline
              maxRows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Grid>
          <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
            <Button onClick={handleSubmit}>{t("submit_comment_button")}</Button>
          </Grid>
        </Grid>
      ) : null}

      {hallComments.length > 0 ? (
        <div style={{ padding: 14 }} className="App">
          <h1>{t("comments_heading")}</h1>

          <Paper style={{ padding: "40px 20px", marginTop: 100 }}>
            {hallComments.map((comment) => (
              <Grid key={comment.id_user} container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar
                    alt="Remy Sharp"
                    src={`${userImage}${comment.user.photo}`}
                  />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}>
                    {comment.user.name}
                  </h4>
                  <p style={{ textAlign: "left" }}>{comment.value}</p>
                  <p style={{ textAlign: "left", color: "gray" }}>
                    {comment.Date}
                  </p>
                  <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                </Grid>
              </Grid>
            ))}
          </Paper>
        </div>
      ) : null}
    </Box>
  );
}

export default CommentSection;
