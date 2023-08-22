import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ShowVideoModal = ({ video, onClose }) => {
  const vidSrc = "http://192.168.1.66:8080/public/videos/";

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={Boolean(video)} onClose={onClose}>
      <Box sx={style}>
        {video && (
          <>
            <video width="100%" controls>
              <source
                src={`${vidSrc}${video.replace(/\.jpg$/, "")}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <Typography variant="subtitle1">{video}</Typography>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ShowVideoModal;
