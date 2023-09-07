import * as React from "react";
import dayjs from "dayjs";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import axios from "axios";

export default function DateCalendarValue({ hall_id }) {
  const [value, setValue] = React.useState(null);
  const [occupiedDates, setOccupiedDates] = React.useState([]);

  React.useEffect(() => {
    if (!hall_id) return;
    axios
      .get(
        `https://bh-qpxe.onrender.com:8080/api/v1/bh/reservation?id_hall=${hall_id}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const data = response.data.data.data;
        setOccupiedDates(data.map((item) => item.effect_date));
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  }, [hall_id]);

  const disableDate = (date) => {
    const now = dayjs();
    return (
      date.isBefore(now, "day") ||
      occupiedDates.some((d) => dayjs(d).isSame(date, "day"))
    );
  };

  const renderDay = (date, _selectedDate, dayInCurrentMonth, dayComponent) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const isOccupied = occupiedDates.includes(formattedDate);

    if (!dayInCurrentMonth) {
      return <div />;
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {dayComponent}
        <div>{isOccupied ? "Occupied" : "Free"}</div>
      </div>
    );
  };

  return (
    <DateCalendar
      value={value}
      onChange={(newValue) => setValue(newValue)}
      renderDay={renderDay}
      minDate={dayjs()}
      maxDate={dayjs().add(1, "year")}
      shouldDisableDate={disableDate}
    />
  );
}
