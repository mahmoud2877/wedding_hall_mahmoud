import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export default function BasicRating({ hallRate }) {
  const router = useRouter();

  const getCurrentLanguage = () => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      return storedLanguage || router.locale;
    }
  };
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        ...(getCurrentLanguage() === "ar" && {
          "& .MuiRating-root": {
            direction: "rtl",
          },
        }),
      }}
    >
      <Typography component="legend">{t("total_rate")}</Typography>
      <Rating name="read-only" value={hallRate} readOnly size="large" />
    </Box>
  );
}
