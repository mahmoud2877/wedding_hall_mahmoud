import React from "react";
import "./navbar.css";
import Box from "@mui/material/Box";
// import { IconButton } from "@mui/material";
// import Typography from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
// import { Link } from "react-router-dom";
import { useContext } from "react";
import { useRouter } from "next/router";
import { authContext } from "../../pages/AuthContext";
import { useTranslation } from "next-i18next";
import axios from "axios";
import {
  Avatar,
  Button,
  Drawer,
  InputAdornment,
  Menu,
  MenuItem,
  Slide,
  Stack,
  Tooltip,
  useScrollTrigger,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";

// import { AuthContext } from "../../context/AuthContext";
const Navbar = ({
  setOpen,
  currentLanguage,
  selectedLanguageIcon,
  handleOpenLangMenu,
  anchorElLang,
  handleCloseLangMenu,
  handleLanguageChange,
  languages,
  isLoogedIn,
  anchorElUser,
  handleCloseUserMenu,
  settings,
  handleLogout,
  handleOpenUserMenu,
}) => {
  const { profile, setProfile } = React.useContext(authContext);
  console.log(profile, "isLoggedInisLoggedIn");
  const { t } = useTranslation();

  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // React.useEffect(() => {
  //   // Function to update the window width when it changes
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   // Add a window resize event listener
  //   window.addEventListener("resize", handleResize);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  // const { user } = useContext(AuthContext);
  const userImage = "http://192.168.1.66:8080/public/img/users/";

  React.useEffect(() => {
    const response = axios
      .get(`http://192.168.1.66:8080/api/v1/bh/user/profile`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setProfile]);

  const router = useRouter();
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  console.log(anchorElUser, "anchorElUser");
  return (
    <div className="navbar">
      <div className="navContainer">
        <div className="logo_menu">
          <div className="header-container">
            <button
              className="menu-button"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </button>
          </div>
          <div className="header-container">
            <button
              className="menu-button"
              id="open-drawer-button"
              onClick={() => router.push("/")}
            >
              <span className="menu-icon"></span>
            </button>
            <h1 className="logo">
              <img
                src="/logo/logo.png"
                alt="Halls Logo"
                className="imggggg"
                // width="45%"
                // max-width="160"
                // height="30"
                onClick={() => router.push("/")}
              />
            </h1>
          </div>
        </div>
        <div className="navItems">
          {isLoogedIn ? (
            <>
              <Tooltip>
                <IconButton
                  color="inherit"
                  aria-controls="menu-language"
                  aria-haspopup="true"
                  onClick={handleOpenLangMenu}
                  sx={{
                    width: "50px",
                    height: "50px",
                    maxWidth: "50px",
                    "& .css-1pqm26d-MuiAvatar-img ": {
                      width: "30px",
                      height: "30px",
                    },
                  }}
                >
                  <Avatar
                    sx={{ width: "30px", maxWidth: "100%", height: "30px" }}
                    alt={currentLanguage}
                    src={selectedLanguageIcon}
                  />
                </IconButton>
              </Tooltip>
              {/* <Button
                onClick={() => router.push("/CreateHallSteps")}
                color="inherit"
                sx={{
                  p: 2,
                  "@media (max-width: 1280px)": {
                    fontSize: "0.6rem",
                    // padding: "10px 20px",
                    minWidth: "auto",
                    // width: "auto",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                  // "@media (max-width: 600px)": {
                  //   fontSize: "0.4rem",
                  //   // padding: "10px 20px",
                  //   minWidth: "auto",
                  //   // width: "auto",
                  //   overflow: "hidden",
                  //   textOverflow: "ellipsis",
                  // },
                }}
              >
                {t("drawer.becomePartner")}
              </Button> */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === t("navbar.logout")
                        ? handleLogout
                        : handleCloseUserMenu
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>

              <Tooltip title={t("navbar.openSettings")}>
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar
                    sx={{
                      ".css-1pqm26d-MuiAvatar-img": {
                        width: "70%",
                        height: "70%",
                      },
                    }}
                    // sx={{ width: "30px", maxWidth: "100%", height: "30px" }}
                    alt={profile?.name}
                    src={profile?.photo ? `${userImage}${profile.photo}` : null}
                  />
                </IconButton>
              </Tooltip>

              <Menu
                id="menu-language"
                anchorEl={anchorElLang}
                open={Boolean(anchorElLang)}
                onClose={handleCloseLangMenu}
              >
                {languages.map((language) => (
                  <MenuItem
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    disabled={language.code === currentLanguage}
                  >
                    <Avatar
                      alt={language.label}
                      src={language.icon}
                      sx={{ mr: 1 }}
                    />
                    {language.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              <Tooltip>
                <IconButton
                  color="inherit"
                  aria-controls="menu-language"
                  aria-haspopup="true"
                  onClick={handleOpenLangMenu}
                  sx={{
                    // width: "20%",

                    width: "50px",
                    height: "50px",
                    maxWidth: "50px",
                    "& .css-1pqm26d-MuiAvatar-img ": {
                      width: "30px",
                      height: "30px",
                    },
                  }}
                >
                  <Avatar
                    sx={{ width: "30px", maxWidth: "100%", height: "30px" }}
                    alt={currentLanguage}
                    src={selectedLanguageIcon}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-language"
                anchorEl={anchorElLang}
                open={Boolean(anchorElLang)}
                onClose={handleCloseLangMenu}
              >
                {languages.map((language) => (
                  <MenuItem
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    disabled={language.code === currentLanguage}
                  >
                    <Avatar
                      alt={language.label}
                      src={language.icon}
                      sx={{ mr: 1 }}
                    />
                    {language.label}
                  </MenuItem>
                ))}
              </Menu>
              {/* <Button
                onClick={() => router.push("/SignIn")}
                color="inherit"
                sx={{
                  p: 2,

                  "@media (max-width: 1280px)": {
                    fontSize: "0.6rem",
                    // padding: "10px 20px",
                    minWidth: "auto",
                    // width: "auto",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                  // "@media (max-width: 600px)": {
                  //   fontSize: "0.4rem",
                  //   // padding: "10px 20px",
                  //   minWidth: "auto",
                  //   // width: "auto",
                  //   overflow: "hidden",
                  //   textOverflow: "ellipsis",
                  // },
                }}
              >
                {t("drawer.SignInNow")}
              </Button> */}
              <Button
                sx={{
                  "@media (max-width: 1280px)": {
                    fontSize: "0.6rem",
                    // padding: "10px 20px",
                    minWidth: "auto",
                    // width: "auto",
                    overflow: "hidden",
                  },
                  // "@media (max-width: 600px)": {
                  //   fontSize: "0.4rem",
                  //   // padding: "10px 20px",
                  //   minWidth: "auto",
                  //   // width: "auto",
                  //   overflow: "hidden",
                  // },
                }}
                style={{
                  backgroundColor: "whitesmoke",
                  color: "#02a768",
                }}
                onClick={() => router.push("/SignIn")}
                color="inherit"
              >
                {t("navbar.signIn")}
              </Button>
            </>
          )}
          {/* <button className="navButton"> {t("drawer.becomePartner")}</button>
          <button className="navButton">{t("signIn.title")}</button> */}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Navbar;
