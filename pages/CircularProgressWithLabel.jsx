import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export function CircularProgressWithLabel(props) {
  return (
    <>
      <CircularProgress variant="determinate" value={props.value} />

      <Typography variant="caption" component="div" color="text.secondary">
        {`${Math.round(props.value)}%`}
      </Typography>
    </>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
