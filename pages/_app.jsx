// import React from "react";
// import { IdProvider } from "./IdContext";
// // import AppBarWithDrawer from "./AppBarWithDrawer";
// import { useRouter } from "next/router";
// import { AuthProvider } from "./AuthContext";
// import { HallsProvider } from "./hall_filtered_hallsCotnext";
// import NextNProgress from "nextjs-progressbar";
// import { I18nextProvider } from "react-i18next";
// import i18n from "../i18n";
// import { FavouriteProvider } from "./FavouriteContext";
// import { appWithTranslation } from "next-i18next";
// import { useTranslation } from "react-i18next";
// import { PageProvider } from "./PageContext";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
// import { prefixer } from "stylis";
// import dynamic from "next/dynamic";
// import "dayjs/locale/ar";

// const AppBarWithDrawer = dynamic(() => import("../pages/AppBarWithDrawer"), {
//   ssr: false,
// });

// const defaultTheme = createTheme({
//   direction: "rtl",
//   typography: {
//     fontFamily: "AL-Mohanad",
//   },
// });

// const ltrTheme = createTheme({
//   direction: "ltr",
// });
// // const cacheRtl = createCache({
// //   key: "muirtl",
// //   stylisPlugins: [prefixer, rtlPlugin],
// // });
// function MyApp({ Component, pageProps }) {
//   const [isRtl, setIsRtl] = React.useState(false);

//   console.log(isRtl, "isRtlisRtlisRtl");
//   const { t } = useTranslation();
//   const router = useRouter();
//   const getStoredLanguage = () => {
//     if (typeof window !== "undefined") {
//       const storedLanguage = localStorage.getItem("language");
//       return storedLanguage || i18n.options.fallbackLng;
//     }
//   };
//   const [theme, setTheme] = React.useState(ltrTheme);

//   const [currentLanguage, setCurrentLanguage] = React.useState(
//     getStoredLanguage()
//   );
//   console.log(currentLanguage);

//   console.log(theme, "themetheme");
//   React.useEffect(() => {
//     i18n.changeLanguage(currentLanguage);
//     if (currentLanguage === "ar") {
//       setTheme(defaultTheme);
//       setIsRtl(true);
//     } else {
//       setTheme(ltrTheme);
//       setIsRtl(false);
//     }
//   }, [currentLanguage, theme]);

//   React.useEffect(() => {
//     if (theme.direction === "rtl") {
//       setIsRtl(true);
//     } else {
//       setIsRtl(false);
//     }
//   }, [theme]);

//   const showNavBar = ![
//     "/SignIn",
//     "/SignUp",
//     "/ForgetPassword",
//     "/ResetPassword/[ResetPassword]",
//   ].includes(router.pathname);

//   const component = showNavBar ? (
//     <LocalizationProvider
//       dateAdapter={AdapterDayjs}
//       adapterLocale={getStoredLanguage()}
//     >
//       {isRtl ? (
//         // <CacheProvider value={cacheRtl}>
//         <ThemeProvider theme={theme}>
//           <I18nextProvider i18n={i18n}>
//             <FavouriteProvider>
//               <PageProvider>
//                 <HallsProvider>
//                   <AuthProvider>
//                     <IdProvider>
//                       <AppBarWithDrawer
//                         component={Component}
//                         pageProps={pageProps}
//                         t={t}
//                       />
//                     </IdProvider>
//                   </AuthProvider>
//                 </HallsProvider>
//               </PageProvider>
//             </FavouriteProvider>
//           </I18nextProvider>
//         </ThemeProvider>
//       ) : (
//         // </CacheProvider>
//         <ThemeProvider theme={theme}>
//           <I18nextProvider i18n={i18n}>
//             <FavouriteProvider>
//               <PageProvider>
//                 <HallsProvider>
//                   <AuthProvider>
//                     <IdProvider>
//                       <AppBarWithDrawer
//                         component={Component}
//                         pageProps={pageProps}
//                         t={t}
//                       />
//                     </IdProvider>
//                   </AuthProvider>
//                 </HallsProvider>
//               </PageProvider>
//             </FavouriteProvider>
//           </I18nextProvider>
//         </ThemeProvider>
//       )}
//     </LocalizationProvider>
//   ) : (
//     <LocalizationProvider
//       dateAdapter={AdapterDayjs}
//       adapterLocale={getStoredLanguage()}
//     >
//       {isRtl ? (
//         // <CacheProvider value={cacheRtl}>
//         <ThemeProvider theme={theme}>
//           <I18nextProvider i18n={i18n}>
//             <FavouriteProvider>
//               <PageProvider>
//                 <HallsProvider>
//                   <AuthProvider>
//                     <IdProvider>
//                       <Component {...pageProps} t={t} />
//                     </IdProvider>
//                   </AuthProvider>
//                 </HallsProvider>
//               </PageProvider>
//             </FavouriteProvider>
//           </I18nextProvider>
//         </ThemeProvider>
//       ) : (
//         // </CacheProvider>
//         <ThemeProvider theme={theme}>
//           <I18nextProvider i18n={i18n}>
//             <FavouriteProvider>
//               <PageProvider>
//                 <HallsProvider>
//                   <AuthProvider>
//                     <IdProvider>
//                       <Component {...pageProps} t={t} />
//                     </IdProvider>
//                   </AuthProvider>
//                 </HallsProvider>
//               </PageProvider>
//             </FavouriteProvider>
//           </I18nextProvider>
//         </ThemeProvider>
//       )}
//     </LocalizationProvider>
//   );

//   return (
//     <>
//       <NextNProgress color="#8F00FF" />
//       <div dir={isRtl ? "rtl" : "ltr"}>
//         <ThemeProvider theme={theme}>{component}</ThemeProvider>
//       </div>
//     </>
//   );
// }

// export default appWithTranslation(MyApp);
import React from "react";
import { IdProvider } from "./IdContext";
import { useRouter } from "next/router";
import { AuthProvider } from "./AuthContext";
import { SearchProvider } from "./SearchContext";
import { HallsProvider } from "./hall_filtered_hallsCotnext";
import NextNProgress from "nextjs-progressbar";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { FavouriteProvider } from "./FavouriteContext";
import { appWithTranslation } from "next-i18next";
import { useTranslation } from "react-i18next";
import { PageProvider } from "./PageContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import dynamic from "next/dynamic";
import "dayjs/locale/ar";
import LoadingSpinner from "@/components/loading/loading";
// import LoadingSpinner from "@/components/loading/loading";
const AppBarWithDrawer = dynamic(() => import("../pages/AppBarWithDrawer"), {
  ssr: false,
});

const defaultTheme = createTheme({
  direction: "rtl",

  typography: {
    fontFamily: "AL-Mohanad",
  },
});

const ltrTheme = createTheme({
  direction: "ltr",
});

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);

  const [isRtl, setIsRtl] = React.useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  React.useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);
  const getStoredLanguage = () => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      return storedLanguage || "ar";
    }
  };

  const [theme, setTheme] = React.useState(ltrTheme);
  const storedLanguage = getStoredLanguage();

  const initialLanguage = storedLanguage;
  const [currentLanguage, setCurrentLanguage] = React.useState(initialLanguage);

  React.useEffect(() => {
    setCurrentLanguage(initialLanguage);
  }, [initialLanguage]);

  React.useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    if (currentLanguage === "ar") {
      setTheme(defaultTheme);
      setIsRtl(true);
    } else {
      setTheme(ltrTheme);
      setIsRtl(false);
    }
  }, [currentLanguage, theme]);

  React.useEffect(() => {
    if (theme.direction === "rtl") {
      setIsRtl(true);
    } else {
      setIsRtl(false);
    }
  }, [theme]);

  const showNavBar = ![].includes(router.pathname);

  if (loading) {
    return <LoadingSpinner />;
  }
  const component = showNavBar ? (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={getStoredLanguage()}
    >
      {isRtl ? (
        // <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <FavouriteProvider>
              <PageProvider>
                <HallsProvider>
                  <AuthProvider>
                    <SearchProvider>
                      <IdProvider>
                        <AppBarWithDrawer
                          component={Component}
                          pageProps={pageProps}
                          t={t}
                        />
                      </IdProvider>
                    </SearchProvider>
                  </AuthProvider>
                </HallsProvider>
              </PageProvider>
            </FavouriteProvider>
          </I18nextProvider>
        </ThemeProvider>
      ) : (
        // </CacheProvider>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <FavouriteProvider>
              <PageProvider>
                <HallsProvider>
                  <AuthProvider>
                    <SearchProvider>
                      <IdProvider>
                        <AppBarWithDrawer
                          component={Component}
                          pageProps={pageProps}
                          t={t}
                        />
                      </IdProvider>
                    </SearchProvider>
                  </AuthProvider>
                </HallsProvider>
              </PageProvider>
            </FavouriteProvider>
          </I18nextProvider>
        </ThemeProvider>
      )}
    </LocalizationProvider>
  ) : (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={getStoredLanguage()}
    >
      {isRtl ? (
        // <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <FavouriteProvider>
              <PageProvider>
                <HallsProvider>
                  <AuthProvider>
                    <SearchProvider>
                      <IdProvider>
                        <Component {...pageProps} t={t} />
                      </IdProvider>
                    </SearchProvider>
                  </AuthProvider>
                </HallsProvider>
              </PageProvider>
            </FavouriteProvider>
          </I18nextProvider>
        </ThemeProvider>
      ) : (
        // </CacheProvider>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <FavouriteProvider>
              <PageProvider>
                <HallsProvider>
                  <AuthProvider>
                    <SearchProvider>
                      <IdProvider>
                        <Component {...pageProps} t={t} />
                      </IdProvider>
                    </SearchProvider>
                  </AuthProvider>
                </HallsProvider>
              </PageProvider>
            </FavouriteProvider>
          </I18nextProvider>
        </ThemeProvider>
      )}
    </LocalizationProvider>
  );

  return (
    <>
      {/* <React.Suspense fallback={<LoadingSpinner />}> */}
      <div dir={isRtl ? "rtl" : "ltr"}>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </div>
      {/* </React.Suspense> */}
    </>
  );
}

export default appWithTranslation(MyApp);
