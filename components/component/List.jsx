import "./list.css";
import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
// import SearchIcon from "@mui/icons-material/Search";
import { Margin, Source } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import SearchIcon from "@mui/icons-material/Search";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PageContext from "../../pages/PageContext";
import { searchContext } from "@/pages/SearchContext";
import { useRouter } from "next/router";
import axios from "axios";
import dayjs from "dayjs";

// import SearchItem from "../../component/searchItem/SearchItem";
// import useFetch from "../../hooks/useFetch";

const ListSearch = () => {
  const [openOptions, setOpenOptions] = useState(false);
  const [governorateData, setGovernorateData] = useState([]);
  const [cityId, setCityId] = useState("");
  const [cityData, setCityData] = useState([]);
  const [governmentId, setGovernmentId] = useState("");
  const { search, setSearch } = useContext(searchContext);
  const [valueGov, setValueGov] = useState(search.governorate);
  const [valueCit, setValueCit] = useState(search.city);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [selectesDate, setSelectedDate] = useState(new Date());
  const [options, setOptions] = useState({
    adult: 0,
    children: 0,
    room: 1,
  });
  useEffect(() => {
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
  const guestRef = useRef(null);
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
  const onCityChange = (event) => {
    console.log(...event.target.value);
    setCityId(event.target.value);
    setValueCit(event.target.value);
  };
  const handleOptionInput = (name, value) => {
    setOptions((prev) => {
      return {
        ...prev,
        adult: value,
      };
    });
  };
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  // const location = useLocation();
  // const [destination, setDestination] = useState(location.state.destination);
  // const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  // const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { page } = useContext(PageContext);
  console.log(search, "searchlllllllllllllollist");
  const { t } = useTranslation();

  // const { data, loading, error, reFetch } = useFetch(
  //   `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  // );

  // const handleClick = () => {
  //   reFetch();
  // };
  const router = useRouter();

  const onSubmit = (data) => {
    data.preventDefault();
    // setLoading(true);
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

    console.log(selectedEl, "seeeelelelelele", data.target[0].value);
    if (selectedEl) {
      // if (currentLanguage === "en") {
      //   params.governorate = selectedEl.governorate_name_en;
      // } else {
      //   params.governorate = selectedEl.governorate_name_ar;
      // }
      params.governorate = selectedEl.id;
    }
    const selectedCity = cityData.find((el) => {
      return el.id == cityId;
    });
    console.log(cityData, selectedCity, "citycity");
    if (selectedCity) {
      // if (currentLanguage === "en") {
      //   params.city = selectedCity.city_name_en;
      // } else {
      //   params.city = selectedCity.city_name_ar;
      // }
      params.city = selectedCity.id;
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
      console.log(search, "searchsearch");
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
    // if (featureQuery) {
    //   params.feature = featureQuery;
    // }
    // if (governmentId) {
    //   params.governorate = governmentId;
    // }
    // if (cityId) {
    //   params.city = cityId;
    // }
    console.log(search, "searchsearch");
    setSearch(params);

    router.push("/");
    console.log(params, "params");
  };
  const onGovernorateChange = async (event) => {
    console.log(...event.target.value);
    setGovernmentId(event.target.value);
    setValueGov(event.target.value);
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

  useState(() => {
    const featchData = async () => {
      // if (valueGov) {
      try {
        const response = await axios.get(
          `http://192.168.1.66:8080/api/v1/bh/cities/?governorate_id=${valueGov}`,
          {
            withCredentials: true,
          }
        );
        setCityData(response.data.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    // };
    featchData();
  }, []);

  console.log(valueGov, "++++", "governmentidiiiiiiiiii");

  return (
    <div className="listSearch">
      <form className="headerSearchinner" onSubmit={onSubmit}>
        {/* <Grid
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
        > */}
        {/* <Grid item xs={2} sm={3} sx={{ minWidth: "5%", maxWidth: "5%" }}> */}
        <h1 className="lsTitle">{t("list.Search")}</h1>
        <div className="headerSearchIteminner">
          <input
            placeholder={t("navbar.searchbyname")}
            className="headerSearchText headerSearchInputSelect  inputName"
            value={name}
            defaultValue={search}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <SearchIcon className="headerIcon" />
        </div>
        {/* </Grid>  */}
        {/* <Grid item xs={2} sm={3} sx={{ minWidth: "5%", maxWidth: "5%" }}> */}
        <div className="headerSearchIteminner">
          <select
            className=" headerSearchText headerSearchInputSelect"
            placeholder="choose government?"
            value={valueGov || search.governorate}
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
        {/* </Grid> */}
        {/* <Grid item xs={2} sm={3} sx={{ minWidth: "5%", maxWidth: "5%" }}> */}
        <div className="headerSearchIteminner">
          <select
            className=" headerSearchText headerSearchInputSelect"
            value={valueCit}
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
        {/* </Grid> */}
        {/* <Grid item xs={2} sm={3} sx={{ minWidth: "5%", maxWidth: "5%" }}> */}
        <div className="headerSearchIteminner">
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
        {/* // </Grid> */}
        {/* <Grid item xs={2} sm={3} sx={{ minWidth: "5%", maxWidth: "5%" }}> */}
        <div className="headerSearchIteminner" ref={guestRef}>
          <span
            onClick={() => setOpenOptions(!openOptions)}
            className="headerSearchText"
          >{`${options.adult} ${t("navbar.guestNumber")} `}</span>
          {openOptions && (
            <div className="options">
              <div className="optionItem">
                <span className="optionText">{t("navbar.guestNumber")}</span>
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
        {/* // </Grid> */}

        {/* <div className="headerSearchIteminner"> */}
        <button type="submit" className="headerBtn">
          {t("navbar.submit")}
        </button>
        {/* </div> */}
        {/* // </Grid> */}
      </form>
    </div>
  );
};

export default ListSearch;
