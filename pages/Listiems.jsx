import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import { useRouter } from "next/router";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import { useTranslation } from "next-i18next";

export const MainListItems = ({ profile, setOpen }) => {
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <React.Fragment>
      <ListItemButton onClick={() => router.push("/") && setOpen(false)}>
        <ListItemIcon>
          <HomeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("drawer.home")} />
      </ListItemButton>
      <ListItemButton
        onClick={() =>
          !profile
            ? router.push("/SignIn") && setOpen(false)
            : router.push("/CreateHallSteps") && setOpen(false)
        }
      >
        <ListItemIcon>
          <HandshakeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("drawer.becomePartner")} />
      </ListItemButton>
      <ListItemButton
        onClick={() =>
          !profile
            ? router.push("/SignIn") && setOpen(false)
            : router.push("/UserHalls") && setOpen(false)
        }
      >
        <ListItemIcon>
          <PermMediaOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("drawer.myHalls")} />
      </ListItemButton>
      <ListItemButton
        onClick={() =>
          !profile
            ? router.push("/SignIn") && setOpen(false)
            : router.push("/Profile") && setOpen(false)
        }
      >
        <ListItemIcon>
          <AccountBoxOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("drawer.profile")} />
      </ListItemButton>
      <ListItemButton
        onClick={() =>
          !profile
            ? router.push("/SignIn") && setOpen(false)
            : router.push("/Favourite") && setOpen(false)
        }
      >
        <ListItemIcon>
          <FavoriteOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("drawer.favourite")} />
      </ListItemButton>
      <ListItemButton
        onClick={() =>
          !profile
            ? router.push("/SignIn") && setOpen(false)
            : router.push("/Reservations") && setOpen(false)
        }
      >
        <ListItemIcon>
          <BookOnlineOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("drawer.reservations")} />
      </ListItemButton>
    </React.Fragment>
  );
};
