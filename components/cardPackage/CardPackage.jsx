import * as React from "react";
import { searchContext } from "@/pages/SearchContext";

import "./card.css";
import { t } from "i18next";
import { i18n } from "next-i18next";
export default function BasicCard({
  packageName,
  profile,
  id_hall,
  id_package,
}) {
  const { search } = React.useContext(searchContext);
  const getCurrentLanguage = () => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      return storedLanguage || router.locale;
    }
  };
  const [currentLanguage, setCurrentLanguage] = React.useState(
    getCurrentLanguage()
  );

  console.log(packageName, "packageName", id_hall, id_package);
  let minGuest;
  let maxGuest;
  let personPrice;
  packageName.package_infos
    .filter((el) => el.tag.includes("minGuest"))
    .map((el) => {
      minGuest = el.value;
    });
  packageName.package_infos
    .filter((el) => el.tag.includes("personprice"))
    .map((el) => {
      personPrice = el.value;
    });
  packageName.package_infos
    .filter((el) => el.tag.includes("maxGuest"))
    .map((el) => {
      maxGuest = el.value;
    });

  // function capitalizeFirstLetter(string) {
  //   // Check if the string is empty or undefined
  //   if (!string) {
  //     return string;
  //   }

  //   // Capitalize the first letter and concatenate with the rest of the string
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  // const handleLanguageChange = (code) => {
  //   // handleCloseLangMenu();

  //   i18n
  //     .changeLanguage(code)
  //     .then(() => {
  //       setCurrentLanguage(code);
  //       const selectedLanguage = languages.find((lang) => lang.code === code);
  //       setSelectedLanguageIcon(selectedLanguage.icon);
  //       if (typeof window !== "undefined") {
  //         localStorage.setItem("language", code);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      console.log("storedLanguage", storedLanguage);
      // setCurrentLanguage(storedLanguage);
      // handleLanguageChange(storedLanguage);
    }
  }, [currentLanguage]);

  return (
    <div class="card">
      <div class="header2">
        <h1 class="title">
          {currentLanguage === "ar"
            ? packageName.value.split("-")[0]
            : packageName.value.split("-")[1]}
        </h1>
        <p class="subtitle">{`${t("number")} ${minGuest} ${t(
          "to"
        )} ${maxGuest}`}</p>
      </div>
      <div class="image">
        <img
          src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
          srcset="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </div>

      {packageName.package_infos
        .filter((el) => !el.tag.startsWith("name"))
        .filter((el) => !el.tag.includes("discount"))
        .filter((el) => !el.tag.includes("Guest"))
        .filter((el) => !el.tag.includes("price"))
        .map((info) =>
          // if(info.includes("Gues"))
          {
            return (
              <div className="packageBoxPrice">
                <h4>{`${t(info.tag)} :`}</h4>
                <h5>{`${info.value}`}</h5>
              </div>
            );
          }
        )}
      <div class="content">
        <div class="price">
          {search.guest ? (
            <>
              <p>{`${t("Cardpackage.totalPrice")}:`}</p>
              <h2>${search.guest * personPrice}</h2>
            </>
          ) : (
            <>
              <p>{`${t("Cardpackage.personPrice")}:`}</p>
              <h2>${personPrice}</h2>
            </>
          )}
        </div>
        <button class="explore">{t("Cardpackage.Book")}</button>
      </div>
    </div>
  );
}
