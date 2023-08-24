import React from "react";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState, useRef, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import Slide from "../slider/Slide";
import { useTranslation } from "next-i18next";
import "../slider/slide.css";
import axios from "axios";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PageContext from "../../pages/PageContext";
import { searchContext } from "@/pages/SearchContext";
import { useRouter } from "next/router";

import {
  IconButton,
  Tooltip,
  Avatar,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";

// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import { useNavigate } from "react-router-dom";
// import { SearchContext } from "../../context/SearchContext";
// import { AuthContext } from "../../context/AuthContext";

const Header = ({
  setHalls,
  setFilteredHalls,
  currentLanguage,
  setLoading,
}) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(true);
  const [governorateData, setGovernorateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [value, setValue] = useState(new Date());
  const [governmentId, setGovernmentId] = useState("");
  const [cityId, setCityId] = useState("");
  const [featureQuery, setFeatureQuery] = useState("wedding");
  const [name, setName] = useState("");
  const router = useRouter();
  const dateRef = useRef(null);
  const guestRef = useRef(null);

  console.log(dates[0].startDate, "datesdates");

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 0,
    children: 0,
    room: 1,
  });

  const { page } = React.useContext(PageContext);
  const { search, setSearch } = React.useContext(searchContext);

  const { t } = useTranslation();

  const locationTypes = [t("indoor"), t("outdoor"), t("villa"), t("session")];
  const settings = [
    t("navbar.profile"),
    t("navbar.account"),
    t("navbar.dashboard"),
    t("navbar.logout"),
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setOpenDate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (guestRef.current && !guestRef.current.contains(event.target)) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    axios
      .get("http://192.168.1.66:8080/api/v1/bh/governorate", {
        withCredentials: true,
      })
      .then((response) => {
        setGovernorateData(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [selectesDate, setSelectedDate] = useState(new Date());
  // const [openDate, setOpenDate] = useState(false);

  const handleSingleDate = (date) => {
    setSelectedDate(date);
    setOpenDate(false);
    // Handle your logic with the selected date
  };

  // const navigate = useNavigate();
  // const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  console.log(options, "optionsoptions");
  const handleOptionInput = (name, value) => {
    setOptions((prev) => {
      return {
        ...prev,
        adult: value,
      };
    });
  };

  const onGovernorateChange = async (event) => {
    console.log(...event.target.value);
    setGovernmentId(event.target.value);
    // const selectedGovernorateId = event.target.value.id;

    try {
      const response = await axios.get(
        `http://192.168.1.66:8080/api/v1/bh/cities/?governorate_id=${event.target.value}`,
        {
          withCredentials: true,
        }
      );
      setCityData(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onCityChange = (event) => {
    console.log(...event.target.value);
    setCityId(event.target.value);
  };

  const onSubmit = (data) => {
    data.preventDefault();
    setLoading(true);
    // console.log(data.target[0].value);
    // console.log(data.target[2].value, "datae");
    // console.log(data.target[3].value, "datae");

    // console.log(res);
    const params = {
      page: page,
    };

    const selectedEl = governorateData.find((el) => {
      return el.id == governmentId;
    });
    // console.log(selectedEl, "seeeelelelelele", data.target[0].value);
    if (selectedEl) {
      if (currentLanguage === "en") {
        params.governorate = selectedEl.governorate_name_en;
      } else {
        params.governorate = selectedEl.governorate_name_ar;
      }
    }
    const selectedCity = cityData.find((el) => {
      return el.id == cityId;
    });
    console.log(cityData, selectedCity, "citycity");
    if (selectedCity) {
      if (currentLanguage === "en") {
        params.city = selectedCity.city_name_en;
      } else {
        params.city = selectedCity.city_name_ar;
      }
    }

    // for (const key of Object.keys(data)) {
    //   if (data[key] !== "" && key !== "governorate" && data[key] !== null) {
    //     params[key] = data[key];
    //   }
    // }
    console.log(
      data.target[2].value,
      "bbhhhbhbh",
      new Date(dates[0].endDate).getDate(),
      new Date(),
      new Date(dates[0].endDate) !== new Date()
    );

    if (new Date(dates[0].endDate).getDate() !== new Date().getDate()) {
      // const selectedDate = new Date(dates.startDate);
      // const selectedEnd = new Date(dates.endDate);

      // selectedDate
      //   .toLocaleDateString("en-US", {
      //     year: "numeric",
      //     month: "numeric",
      //     day: "numeric",
      //   })
      //   .replace(/\//g, "-");
      console.log(dates[0].startDate, "sssssssssssssst");
      function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
      }
      const startDateEff = formatDate(dates[0].startDate);
      const endDateEff = formatDate(dates[0].endDate);
      params.startEff = startDateEff;
      params.endEff = endDateEff;
      console.log(startDateEff, endDateEff);
      console.log(params, "params");
    }

    if (options.adult) {
      params.guest = options.adult;
    }

    if (name) {
      params.name = name;
    }
    if (featureQuery) {
      params.feature = featureQuery;
    }
    // if (governmentId) {
    //   params.governorate = governmentId;
    // }
    // if (cityId) {
    //   params.city = cityId;
    // }
    console.log(search, "searchsearch");

    if (Object.keys(params).length >= 0) {
      console.log(params, "paramsparams");
      setSearch(params);
      axios
        .get("http://192.168.1.66:8080/api/v1/bh/weddinghall", {
          withCredentials: true,
          params,
        })
        .then((response) => {
          setFilteredHalls(
            response.data.data.data.filter(
              (hall) => hall.wedding_infos.length > 0
            )
          );
          setHalls([]);
          router.push("/");
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
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
      setFilteredHalls([]);

      setLoading(false);
      router.push("/");
    }
    console.log(params, "params");
  };

  // const { dispatch } = useContext(SearchContext);

  const handleDate = (item) => {
    setDates([item.selection]);
  };
  let direction;

  if (currentLanguage === "en") {
    direction = "directionltr";
  } else {
    direction = "directionrtl";
  }

  const handleFilter = (query) => {
    console.log(query);
    setFeatureQuery(query);
    // const paramFeatures = { feature: query };
    // console.log(paramFeatures);

    const params = {
      page: page,
    };

    const selectedEl = governorateData.find((el) => {
      return el.id == governmentId;
    });
    // console.log(selectedEl, "seeeelelelelele", data.target[0].value);
    if (selectedEl) {
      if (currentLanguage === "en") {
        params.governorate = selectedEl.governorate_name_en;
      } else {
        params.governorate = selectedEl.governorate_name_ar;
      }
    }
    const selectedCity = cityData.find((el) => {
      return el.id == cityId;
    });
    console.log(cityData, selectedCity, "citycity");
    if (selectedCity) {
      if (currentLanguage === "en") {
        params.city = selectedCity.city_name_en;
      } else {
        params.city = selectedCity.city_name_ar;
      }
    }
    if (options.adult) {
      params.guest = options.adult;
    }

    if (name) {
      params.name = name;
    }
    if (featureQuery) {
      params.feature = featureQuery;
    }
    if (dates[0].startDate !== new Date()) {
      // const selectedDate = new Date(dates.startDate);
      // const selectedEnd = new Date(dates.endDate);

      // selectedDate
      //   .toLocaleDateString("en-US", {
      //     year: "numeric",
      //     month: "numeric",
      //     day: "numeric",
      //   })
      //   .replace(/\//g, "-");
      console.log(dates[0].startDate, "sssssssssssssst");
      function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
      }
      const startDateEff = formatDate(dates[0].startDate);
      const endDateEff = formatDate(dates[0].endDate);
      params.startEff = startDateEff;
      params.endEff = endDateEff;
      console.log(startDateEff, endDateEff);
      console.log(params, "params");
    }

    axios
      .get(`http://192.168.1.66:8080/api/v1/bh/weddinghall?feature=${query}`, {
        withCredentials: true,
        // paramFeatures,
      })
      .then((response) => {
        setFilteredHalls(
          response.data.data.data.filter(
            (hall) => hall.wedding_infos.length > 0
          )
        );
        setHalls([]);
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="header">
      <div className="background">
        <div className="headerContainer">
          <div className="headerList">
            <button
              className={`headerListItem ${
                featureQuery === "wedding" ? "active" : ""
              } `}
              onClick={() => handleFilter("wedding")}
            >
              <img
                src="/icons/wedding.png"
                alt="Icon"
                className="icon_wedding"
              />
              <span>{t("wedding")} </span>
            </button>
            <button
              className={`headerListItem ${
                featureQuery === "photoshoot" ? "active" : ""
              } `}
              onClick={() => handleFilter("photoshoot")}
            >
              <CameraAltIcon />
              <span>{t("photoshoot")}</span>
            </button>
            <button
              className={`headerListItem ${
                featureQuery === "conferences" ? "active" : ""
              } `}
              onClick={() => handleFilter("conferences")}
            >
              <GroupsIcon />
              <span>{t("conferences")}</span>
            </button>
            <button
              className={`headerListItem ${
                featureQuery === "graduation" ? "active" : ""
              } `}
              onClick={() => handleFilter("graduation")}
            >
              <SchoolIcon />
              <span>{t("graduation")}</span>
            </button>
            {/* <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div> */}
          </div>
          <>
            <h1 className="headerTitle">{t("searchHall")}</h1>
            {/* <p className="headerDesc">
            Get rewarded for your travels – unlock instant savings of 10% or
            more with a free Lamabooking account
          </p> */}
            {/* {!user && <button className="headerBtn">Sign in / Register</button>} */}
          </>
        </div>
      </div>
      <form className="headerSearch" onSubmit={onSubmit}>
        <Grid
          sx={{
            justifyContent: "center",
            // marginTop: "-2rem",
            width: "100%",
            mx: "auto",
          }}
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction={{ xs: "column", sm: "row" }}
        >
          {/* <Grid item xs={2} sm={3} sx={{ minWidth: "5%", maxWidth: "5%" }}>
            <div className="headerSearchItem">
              <input
                placeholder={t("navbar.searchbyname")}
                className="headerSearchText headerSearchInputSelect  inputName"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <SearchIcon className="headerIcon" />
            </div>
          </Grid> */}
          <Grid item xs={2} sm={3} sx={{ minWidth: "5%", maxWidth: "5%" }}>
            <div className="headerSearchItem">
              <select
                className=" headerSearchText headerSearchInputSelect"
                placeholder="choose government?"
                onChange={(e) => onGovernorateChange(e)}
              >
                <option
                  value=""
                  disabled
                  selected
                  hidden
                  className="headerSearchText"
                >
                  {t("navbar.governorate")}
                </option>
                {governorateData.map((el) => (
                  <option value={el.id} className="headerSearchText">
                    {el.governorate_name_en}
                  </option>
                ))}
              </select>
              <AssuredWorkloadIcon className="headerIcon" />
            </div>
          </Grid>
          <Grid item xs={2} sm={3} sx={{ minWidth: "5%", maxWidth: "5%" }}>
            <div className="headerSearchItem">
              <select
                className=" headerSearchText headerSearchInputSelect"
                onChange={(e) => onCityChange(e)}
              >
                <option
                  value=""
                  disabled
                  selected
                  hidden
                  className="headerSearchText"
                >
                  {t("navbar.city")}
                </option>
                {cityData.map((el) => (
                  <option value={el.id} className="headerSearchText">
                    {el.city_name_en}
                  </option>
                ))}
              </select>
              <LocationCityIcon className="headerIcon" />
            </div>
          </Grid>
          <Grid item xs={2} sm={3} sx={{ minWidth: "5%", maxWidth: "5%" }}>
            <div className="headerSearchItem">
              {" "}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  defaultValue={dayjs("2022/04/17")}
                  sx={{
                    // outline: "none", // Hide the outline

                    "& .MuiInputBase-root": {
                      // outline: "none", // Hide outline for the input field
                    },
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "none",
                      fontSize: "0.9rem",
                      padding: "0px 0px",
                      width: "100px",

                      "&:hover": {
                        borderColor: "transparent", // Hide border on hover
                      },
                    },
                    "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                      width: "100px",
                      fontSize: "15px",
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          </Grid>
          <Grid item xs={2} sm={3} sx={{ minWidth: "5%", maxWidth: "5%" }}>
            <div className="headerSearchItem" ref={guestRef}>
              <span
                onClick={() => setOpenOptions(!openOptions)}
                className="headerSearchText"
              >{`${options.adult} ${t("navbar.guestNumber")} `}</span>
              {openOptions && (
                <div className="options">
                  <div className="optionItem">
                    <span className="optionText">
                      {t("navbar.guestNumber")}
                    </span>
                    <div className="optionCounter">
                      <button
                        disabled={options.adult <= 1}
                        className="optionCounterButton"
                        type="button"
                        onClick={() => handleOption("adult", "d")}
                      >
                        -
                      </button>
                      <input
                        className="optionCounterNumber"
                        onChange={(e) =>
                          handleOptionInput("adult", +e.target.value)
                        }
                        value={options.adult}
                      />

                      <button
                        className="optionCounterButton"
                        type="button"
                        onClick={() => handleOption("adult", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {/* <div className="optionItem">
                    <span className="optionText">Children</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.children <= 0}
                        className="optionCounterButton"
                        onClick={() => handleOption("children", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.children}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("children", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.room <= 1}
                        className="optionCounterButton"
                        onClick={() => handleOption("room", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.room}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("room", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div> */}
                </div>
              )}
              <PersonAddAltIcon className="headerIcon" />
            </div>
          </Grid>

          {/* <div className="headerSearchItem"> */}
          <button type="submit" className="headerBtn">
            {t("navbar.submit")}
          </button>
          {/* </div> */}
        </Grid>
      </form>
    </div>
    // </div>
    //   <button className="prev-button">&#10094;</button>
    //   <button className="next-button">&#10095;</button>
    // </div>
  );
};

export default Header;
