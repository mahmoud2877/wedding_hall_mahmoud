import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MainListItems } from "./Listiems";
import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";
import PeopleIcon from "@mui/icons-material/People";
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
import { useRouter } from "next/router";
import axios from "axios";
import { authContext } from "./AuthContext";
import { searchContext } from "./SearchContext";
import hallsContext from "./hall_filtered_hallsCotnext";
import { CircularProgress, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import MainHallsCarousal from "./MainHallsCarousal";
import i18n from "../i18n";
import PageContext from "./PageContext";
import { useTranslation } from "next-i18next";
import "../app/globals.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";
import { SearchOutlined } from "@mui/icons-material";
import "./AppBarWithDrawer.css";
import { DatePicker } from "@mui/x-date-pickers";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Navbar from "@/components/navbar/Navbar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import MailList from "@/components/mailList/MailList";

import { useState, useEffect } from "react";

const drawerWidth = 200;

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#02a768",
    },
  },
  direction: "ltr",
});

const rtlTheme = createTheme({
  palette: {
    primary: {
      main: "#02a768",
    },
  },
  direction: "rtl",
  typography: {
    fontFamily: "AL-Mohanad",
  },
});

function HideOnScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Dashboard(props) {
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerCloseRight = () => {
    setOpenRight(false);
  };
  const [mainHalls, setMainHalls] = React.useState([]);
  const { t } = useTranslation();

  const locationTypes = [t("indoor"), t("outdoor"), t("villa"), t("session")];
  const settings = [
    t("navbar.profile"),
    t("navbar.account"),
    t("navbar.dashboard"),
    t("navbar.logout"),
  ];

  const languages = [
    { code: "en", label: t("navbar.english"), icon: "/icons/en.png" },
    { code: "ar", label: t("navbar.arabic"), icon: "/icons/ar.png" },
  ];

  const { page } = React.useContext(PageContext);

  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit, setValue, control } = useForm();
  const { setHalls, setFilteredHalls } = React.useContext(hallsContext);
  const [anchorElLang, setAnchorElLang] = React.useState(null);
  const getCurrentLanguage = () => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      return storedLanguage || router.locale;
    }
  };

  console.log(getCurrentLanguage(), "languagelanguage");

  const [currentLanguage, setCurrentLanguage] = React.useState(
    getCurrentLanguage()
  );
  const [selectedLanguageIcon, setSelectedLanguageIcon] = React.useState(
    !languages.find((lang) => lang.code === getCurrentLanguage())?.icon
      ? "/icons/ar.png"
      : languages.find((lang) => lang.code === getCurrentLanguage())?.icon
  );

  const filters = ["/HallPreview/[HallPreview]", "/"].includes(router.pathname);
  const storedLanguage = localStorage.getItem("language");
  if (!storedLanguage) {
    localStorage.setItem("language", "ar");
  }
  const { profile, setProfile } = React.useContext(authContext);
  // const { search, setSearch } = React.useContext(authContext);
  const handleLanguageChange = (code) => {
    handleCloseLangMenu();

    i18n
      .changeLanguage(code)
      .then(() => {
        setCurrentLanguage(code);
        const selectedLanguage = languages.find((lang) => lang.code === code);
        setSelectedLanguageIcon(selectedLanguage.icon);
        if (typeof window !== "undefined") {
          localStorage.setItem("language", code);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      handleLanguageChange(storedLanguage);
    }
  }, [currentLanguage]);
  const getTheme = (language) => {
    return language === "ar" ? rtlTheme : defaultTheme;
  };
  const theme = getTheme(currentLanguage);
  const handleOpenLangMenu = (event) => {
    console.log("reachedreached");
    setAnchorElLang(event.currentTarget);
  };
  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isLoogedIn = !!profile;
  const handleLogout = () => {
    axios
      .post("http://192.168.1.66:8080/api/v1/bh/user/logout", "", {
        withCredentials: true,
      })
      .then(() => {
        setProfile(null);
        setAnchorElUser(null);
        router.push("/SignIn");
      });
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = React.useState(false);
  const [openRight, setOpenRight] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("http://192.168.1.66:8080/api/v1/bh/weddinghall", {
        withCredentials: true,
      })
      .then((response) =>
        setHalls(
          response.data.data.data.filter(
            (hall) => hall.wedding_infos.length > 0
          )
        )
      );
  }, [setHalls]);

  // const onSubmit = (data) => {
  //   setLoading(true);

  //   const params = {
  //     page: page,
  //   };
  //   if (currentLanguage === "en") {
  //     params.governorate = data.governorate.governorate_name_en;
  //   } else {
  //     params.governorate = data.governorate.governorate_name_ar;
  //   }

  //   for (const key of Object.keys(data)) {
  //     if (data[key] !== "" && key !== "governorate" && data[key] !== null) {
  //       params[key] = data[key];
  //     }
  //   }

  //   if (Object.keys(params).length >= 0) {
  //     setSearch(params);
  //     axios
  //       .get("http://192.168.1.66:8080/api/v1/bh/weddinghall", {
  //         withCredentials: true,
  //         params,
  //       })
  //       .then((response) => {
  //         setFilteredHalls(
  //           response.data.data.data.filter(
  //             (hall) => hall.wedding_infos.length > 0
  //           )
  //         );
  //         setHalls([]);
  //         router.push("/");
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   } else {
  //     axios
  //       .get("http://192.168.1.66:8080/api/v1/bh/weddinghall", {
  //         withCredentials: true,
  //       })
  //       .then((response) =>
  //         setHalls(
  //           response.data.data.data.filter(
  //             (hall) => hall.wedding_infos.length > 0
  //           )
  //         )
  //       );
  //     setFilteredHalls([]);

  //     setLoading(false);
  //     router.push("/");
  //   }
  // };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const getDrawerAnchor = (language) => {
    return language === "ar" ? "right" : "left";
  };
  React.useEffect(() => {
    axios
      .get("http://192.168.1.66:8080/api/v1/bh/weddinghall", {
        withCredentials: true,
      })
      .then((response) =>
        setMainHalls(
          response.data.data.data.filter(
            (hall) => hall.wedding_infos.length > 0
          )
        )
      );
  }, []);

  const drawerAnchor = getDrawerAnchor(currentLanguage);

  const anchor = theme.direction === "rtl" ? "right" : "left";
  let dirc;
  theme.direction === "ltr" ? (dirc = "ltr") : (dirc = "rtl");
  console.log(dirc, "dircdirc");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(profile, "pattthhhhhhh");
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "white",
        }}
      >
        <Navbar
          setOpen={currentLanguage === "en" ? setOpen : setOpenRight}
          currentLanguage={currentLanguage}
          selectedLanguageIcon={selectedLanguageIcon}
          handleOpenLangMenu={handleOpenLangMenu}
          languages={languages}
          handleLanguageChange={handleLanguageChange}
          handleCloseLangMenu={handleCloseLangMenu}
          anchorElLang={anchorElLang}
          isLoogedIn={isLoogedIn}
          anchorElUser={anchorElUser}
          handleCloseUserMenu={handleCloseUserMenu}
          settings={settings}
          handleLogout={handleLogout}
          handleOpenUserMenu={handleOpenUserMenu}
        />
        {router.pathname.includes("SignIn") ||
        router.pathname.includes("SignUp") ||
        router.pathname.includes("ForgetPassword") ||
        router.pathname.includes("CreateHallSteps") ||
        router.pathname.includes("UserHalls") ||
        router.pathname.includes("Profile") ? (
          ""
        ) : (
          <Header
            setHalls={setHalls}
            setFilteredHalls={setFilteredHalls}
            currentLanguage={currentLanguage}
            setLoading={setLoading}
          />
        )}

        <Drawer
          dir="ltr"
          onClose={handleDrawerClose}
          variant="temporary"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider />
          <List component="nav">
            <MainListItems profile={profile} setOpen={setOpen} />
          </List>
        </Drawer>
        <Drawer
          dir="rtl"
          className="mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm"
          sx={{
            width: drawerWidth,
            // right: 0,
            // width: 200,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              position: "absolute",
              left: windowWidth - 200,
              // right: 0,
            },
          }}
          onClose={handleDrawerCloseRight}
          variant="temporary"
          anchor="left"
          open={openRight}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerCloseRight}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider />
          <List component="nav">
            <MainListItems profile={profile} setOpen={setOpenRight} />
          </List>
        </Drawer>
        <Container maxWidth="lg" sx={{ mt: 5, mb: 4 }}>
          <props.component {...props.pageProps}></props.component>
        </Container>
        <MailList />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
