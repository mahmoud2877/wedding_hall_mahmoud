import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";

export default function AdressSelect({
  label,
  id,
  name,
  options,
  handleParent,
  handleCountry,
  handleCitiesValue,
}) {
  const { control } = useFormContext();

  const onChange = (event, value) => {
    if (label === "governrate") {
      handleParent(event, value);
    } else if (label === "country") {
      handleCountry(event, value);
    } else if (label === "city") {
      handleCitiesValue(event, value);
    }
  };
  return (
    <Autocomplete
      id={id}
      onChange={onChange}
      options={options}
      autoHighlight
      getOptionLabel={(option) => {
        return label === "country"
          ? option.label
          : label === "governorate"
          ? option.governorate_name_en
          : label === "city"
          ? option.city_name_en
          : "";
      }}
      renderOption={(props, option) => (
        <Box
          id={option.id}
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {label === "country" ? (
            <>
              <img
                loading="lazy"
                width="16"
                height="12"
                src={`https://flagcdn.com/16x12/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/32x24/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.label}
            </>
          ) : label === "governorate" ? (
            <>{option.governorate_name_en}</>
          ) : label === "city" ? (
            <>{option.city_name_en}</>
          ) : null}
        </Box>
      )}
      renderInput={(params) => (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              {...params}
              id={id}
              name={name}
              label={label}
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
      )}
    />
  );
}
