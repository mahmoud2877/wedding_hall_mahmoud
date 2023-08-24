import "./list.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchIcon from "@mui/icons-material/Search";
import { Margin } from "@mui/icons-material";

// import SearchItem from "../../component/searchItem/SearchItem";
// import useFetch from "../../hooks/useFetch";

const ListSearch = ({ search }) => {
  // const location = useLocation();
  // const [destination, setDestination] = useState(location.state.destination);
  // const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  // const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  console.log(search, "searchlllllllllllllol");

  // const { data, loading, error, reFetch } = useFetch(
  //   `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  // );

  // const handleClick = () => {
  //   reFetch();
  // };
  return (
    <div className="listSearch">
      <h1 className="lsTitle">Search</h1>
      <div className="lsItem">
        <label>Destination</label>
        <div className="inputlistSearch">
          <SearchIcon
            sx={{
              "& .css-i4bv87-MuiSvgIcon-root": {
                margin: "4px",
              },
            }}
          />
          <input
            placeholder="destination"
            className="inputSearchList"
            type="text"
            defaultValue={
              search.governorate ? search.governorate : "search government"
            }
            // className="inputlistSearch"
          />
        </div>
      </div>
      <div className="lsItem">
        <label>Check-in Date</label>
        {/* <span onClick={() => setOpenDate(!openDate)}>{`${format(
          dates[0].startDate,
          "MM/dd/yyyy"
        )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
        {openDate && (
          <DateRange
            onChange={(item) => setDates([item.selection])}
            minDate={new Date()}
            ranges={dates}
          />
        )} */}
      </div>
      <div className="lsItem">
        <label>Options</label>
        <div className="lsOptions">
          <div className="lsOptionItem">
            <span className="lsOptionText">
              Min price <small>per night</small>
            </span>
            <input
              type="number"
              onChange={(e) => setMin(e.target.value)}
              className="lsOptionInput"
            />
          </div>
          <div className="lsOptionItem">
            <span className="lsOptionText">
              Max price <small>per night</small>
            </span>
            <input
              type="number"
              onChange={(e) => setMax(e.target.value)}
              className="lsOptionInput"
            />
          </div>
          <div className="lsOptionItem">
            <span className="lsOptionText">Guests</span>
            <input
              type="number"
              min={1}
              className="lsOptionInput"
              // placeholder="2"
              defaultValue={search.guest ? search.guest : "search government"}
            />
          </div>
        </div>
      </div>
      <button>Search</button>
    </div>
  );
};

export default ListSearch;
