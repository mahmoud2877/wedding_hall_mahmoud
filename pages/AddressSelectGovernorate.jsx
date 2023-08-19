import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";

export default function AddressSelectGovernorate({
  id,
  name,
  label,
  options,
  handleParent,
}) {
  const getCurrentLanguage = () => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      return storedLanguage || router.locale;
    }
  };

  const { control } = useFormContext();
  const onChange = React.useCallback(
    (event, value) => {
      handleParent(event, value);
    },
    [handleParent]
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
          options={options}
          autoHighlight
          getOptionLabel={(option) =>
            getCurrentLanguage() === "en"
              ? option.governorate_name_en
              : option.governorate_name_ar
          }
          renderOption={(props, option) => (
            <Box
              id={option.id}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {getCurrentLanguage() === "en"
                ? option.governorate_name_en
                : option.governorate_name_ar}{" "}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              required
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
