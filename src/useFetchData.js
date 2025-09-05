import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useFetchData = (countryCode) => {
  const { i18n } = useTranslation();
  const [result, setResult] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (countryCode) {
      fetchDataFromAPI();
    } else {
      fetchDataFromLocalstorage();
    }
  }, [countryCode]); // ✅ أضف i18n.language لتحديث الترجمات عند تغيير اللغة

  const fetchDataFromAPI = async () => {
    setIsLoading(true);
    let url = "https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,cca3";

    if (countryCode) {
      url = `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,cca3`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      if (countryCode) {
        const countryData = Array.isArray(data) ? data[0] : data;
        setResult(countryData);
      } else {
        setFilteredCountries(data);
        setResult(data);
        localStorage.setItem("countries", JSON.stringify(data));
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataFromLocalstorage = () => {
    const data = JSON.parse(localStorage.getItem("countries"));
    if (data) {
      setFilteredCountries(data);
      setResult(data);
    } else {
      fetchDataFromAPI();
    }
  };

  return { result, filteredCountries, setFilteredCountries, isLoading, isError };
};


