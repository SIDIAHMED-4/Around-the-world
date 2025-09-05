import { useTranslation } from "react-i18next";
import { useState } from "react";

/**
 * SearchInput
 * props:
 *  - countriesList: array of country objects (from API / useFetchData)
 *  - filterCountriesList: function to set filtered list in parent
 *  - live (optional): true => filter أثناء الكتابة، false => فقط عند submit
 */
const SearchInput = ({ countriesList = [], filterCountriesList, live = true }) => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");

  // normalize string: lowercase, remove diacritics (latin), keep Arabic letters,
  // remove punctuation, collapse spaces
  const normalize = (s = "") => {
    if (!s) return "";
    // convert to string
    let text = String(s).toLowerCase();
    // remove latin diacritics
    text = text.normalize && text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // remove Arabic diacritics (tashkeel)
    text = text.replace(/[\u0610-\u061A\u064B-\u065F\u06D6-\u06ED]/g, "");
    // remove punctuation except Arabic letters and word chars
    text = text.replace(/[^\w\u0600-\u06FF\s]/g, " ");
    // collapse spaces
    text = text.replace(/\s+/g, " ").trim();
    return text;
  };

  // create searchable string for a country object
  const countryToSearchString = (country) => {
    if (!country || typeof country !== "object") return "";
    const parts = [];

    // displayName (translated name we set)
    if (country.displayName) parts.push(country.displayName);

    // API names
    if (country.name?.common) parts.push(country.name.common);
    if (country.name?.official) parts.push(country.name.official);

    // translations (Arabic)
    if (country.translations?.ara?.common) parts.push(country.translations.ara.common);
    if (country.translations?.ara?.official) parts.push(country.translations.ara.official);

    // cca3
    if (country.cca3) parts.push(country.cca3);

    // capital (array)
    if (Array.isArray(country.capital)) parts.push(country.capital.join(" ")); 
    else if (country.capital) parts.push(country.capital);

    // region / subregion
    if (country.region) parts.push(country.region);
    if (country.subregion) parts.push(country.subregion);

    // currencies: get currency names
    if (country.currencies) {
      try {
        const curNames = Object.values(country.currencies)
          .map((c) => (c && c.name ? c.name : ""))
          .filter(Boolean)
          .join(" ");
        if (curNames) parts.push(curNames);
      } catch (e) {}
    }

    // languages values
    if (country.languages) {
      try {
        const langs = Object.values(country.languages).join(" ");
        if (langs) parts.push(langs);
      } catch (e) {}
    }

    return normalize(parts.join(" "));
  };

  const handleFilter = (rawTerm) => {
    const term = normalize(rawTerm);
    if (!term) {
      filterCountriesList(countriesList);
      return;
    }

    // ensure countriesList is array
    const list = Array.isArray(countriesList) ? countriesList : [];

    const filtered = list.filter((c) => {
      const hay = countryToSearchString(c);
      return hay.includes(term);
    });

    filterCountriesList(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilter(query);
  };

  const handleChange = (e) => {
    const v = e.target.value;
    setQuery(v);
    if (live) handleFilter(v);
  };

  // DEBUG helper: uncomment if you want logs
  // console.log("countriesList length:", Array.isArray(countriesList) ? countriesList.length : typeof countriesList);

  return (
    <form
      className="relative flex-1"
      onSubmit={handleSubmit}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="absolute top-5 ltr:left-8 rtl:right-8">
        {/* svg icon */}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="search">
            <path id="Shape" fillRule="evenodd" clipRule="evenodd" d="M12.5 11H11.7L11.4 10.7C12.4 9.6 13 8.1 13 6.5C13 2.9 10.1 0 6.5 0C2.9 0 0 2.9 0 6.5C0 10.1 2.9 13 6.5 13C8.1 13 9.6 12.4 10.7 11.4L11 11.7V12.5L16 17.5L17.5 16L12.5 11ZM6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5C11 9 9 11 6.5 11Z" fill="#848484" />
          </g>
        </svg>
      </div>

      <input
        type="text"
        name="search"
        value={query}
        onChange={handleChange}
        className="h-12 w-full max-w-md rounded-full shadow dark:bg-gray-800 md:h-14 ltr:pl-20 rtl:pr-20"
        placeholder={t("search")}
        autoComplete="off"
      />
    </form>
  );
};

export default SearchInput;

