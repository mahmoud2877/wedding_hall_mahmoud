import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PageContext from "./PageContext";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import * as locales from "@mui/material/locale";
import i18n from "../i18n";

export default function PaginationControlled() {
  const [locale, setLocale] = React.useState("");

  React.useEffect(() => {
    const language = getStoredLanguage();
    if (language === "en") {
      setLocale("en-US");
    } else {
      setLocale("ar-EG");
    }
  }, [locale]);

  const getStoredLanguage = () => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      return storedLanguage || i18n.options.fallbackLng;
    }
  };

  const theme = useTheme();

  const themeWithLocale = React.useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme]
  );

  const { page, setPage } = React.useContext(PageContext);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <ThemeProvider theme={themeWithLocale}>
      <Stack spacing={4}>
        <Pagination count={10} page={page} onChange={handleChange} />
      </Stack>
    </ThemeProvider>
  );
}
