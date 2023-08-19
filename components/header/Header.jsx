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
import { useRouter } from "next/router";
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
  const [openDate, setOpenDate] = useState(false);
  const [governorateData, setGovernorateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const router = useRouter();
  const dateRef = useRef(null);
  const guestRef = useRef(null);

  console.log(dates);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const { page } = React.useContext(PageContext);

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
      .get("http://127.0.0.1:8080/api/v1/bh/governorate", {
        withCredentials: true,
      })
      .then((response) => {
        setGovernorateData(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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

    // const selectedGovernorateId = event.target.value.id;

    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/api/v1/bh/cities/?governorate_id=${event.target.value}`,
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
      return el.id == data.target[0].value;
    });
    console.log(selectedEl, "seeeelelelelele", data.target[0].value);
    if (selectedEl) {
      if (currentLanguage === "en") {
        params.governorate = selectedEl.governorate_name_en;
      } else {
        params.governorate = selectedEl.governorate_name_ar;
      }
    }
    const selectedCity = cityData.find((el) => {
      return el.id == data.target[1].value;
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
    console.log(data.target[2].value, "bbhhhbhbh");

    if (data.target[2].value) {
      const selectedDate = new Date(data.target[2].value);
      const selectedEnd = new Date(data.target[3].value);
      // selectedDate
      //   .toLocaleDateString("en-US", {
      //     year: "numeric",
      //     month: "numeric",
      //     day: "numeric",
      //   })
      //   .replace(/\//g, "-");

      function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
      const startDateEff = formatDate(selectedDate);
      const endDateEff = formatDate(selectedEnd);
      params.startEff = startDateEff;
      params.endEff = endDateEff;
      console.log(startDateEff, endDateEff);
      console.log(params, "params");
    }

    if (options.adult) {
      params.guest = options.adult;
    }

    if (Object.keys(params).length >= 0) {
      axios
        .get("http://127.0.0.1:8080/api/v1/bh/weddinghall", {
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
        .get("http://127.0.0.1:8080/api/v1/bh/weddinghall", {
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

  return (
    <div className="header">
      <div className={"headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>{t("wedding")} </span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>{t("photoshoot")}</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>{t("conferences")}</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>{t("graduation")}</span>
          </div>
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
          <form className="headerSearch" onSubmit={onSubmit}>
            <div className="headerSearchItem">
              <LocationCityIcon className="headerIcon" />
              <select
                className=" headerSearchText headerSearchInputSelect"
                placeholder="choose government?"
                onChange={(e) => onGovernorateChange(e)}
              >
                <option value="" disabled selected hidden>
                  choose government
                </option>
                {governorateData.map((el) => (
                  <option value={el.id}>{el.governorate_name_en}</option>
                ))}
              </select>
            </div>
            <div className="headerSearchItem">
              <LocationCityIcon className="headerIcon" />
              <select
                className=" headerSearchText headerSearchInputSelect"
                onChange={(e) => onCityChange(e)}
              >
                <option value="" disabled selected hidden>
                  choose city
                </option>
                {cityData.map((el) => (
                  <option value={el.id}>{el.city_name_en}</option>
                ))}
              </select>
            </div>
            <div className="headerSearchItem" ref={dateRef}>
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
              <span
                onClick={() => setOpenDate(!openDate)}
                onBlur={() => setOpenDate(false)}
                className="headerSearchText"
              >{`${format(dates[0].startDate, "dd-mm-yyyy")} to ${format(
                dates[0].endDate,
                "dd-mm-yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  // setDates([item.selection])
                  onChange={(item) => handleDate(item)}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className={`date ${direction}`}
                  minDate={new Date()}
                />
              )}
            </div>
            <div className="headerSearchItem" ref={guestRef}>
              <FontAwesomeIcon icon={faPerson} className="headerIcon" />
              <span
                onClick={() => setOpenOptions(!openOptions)}
                className="headerSearchText"
              >{`${options.adult} guest `}</span>
              {openOptions && (
                <div className="options">
                  <div className="optionItem">
                    <span className="optionText">guest</span>
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
            </div>
            {/* <div className="headerSearchItem"> */}
            <button type="submit" className="headerBtn">
              Search
            </button>
            {/* </div> */}
          </form>
        </>
      </div>
    </div>
    // </div>
    //   <button className="prev-button">&#10094;</button>
    //   <button className="next-button">&#10095;</button>
    // </div>
  );
};

export default Header;
