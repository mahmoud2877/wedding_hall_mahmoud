import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
const countries = [{ code: "EG", label: "Egypt" }];

export default function AdressSelectCountry({
  id,
  name,
  label,
  handleCountry,
}) {
  const { control } = useFormContext();
  const onChange = React.useCallback(
    (event, value) => {
      handleCountry(event, value);
    },
    [handleCountry]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          id={id}
          onChange={onChange}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => {
            return option.label;
          }}
          renderOption={(props, option) => (
            <Box
              id={option.id}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.label}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              required
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
