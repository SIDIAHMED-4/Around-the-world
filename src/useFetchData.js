import { useEffect, useState } from "react";

export const useFetchData = (country) => {
  const [result, setResult] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (country) {
      fetchDataFromAPI();
    } else {
      fetchDataFromLocalstorage();
    }
  }, []);

const fetchDataFromAPI = () => {
  // رابط API صحيح مع تحديد الحقول المطلوبة
  let url = "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,languages,tld,currencies,languages";

  setIsLoading(true);

  if (country) {
    // إذا صفحة دولة واحدة
    url = `https://restcountries.com/v3.1/name/${country}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages`;
  }

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (country) {
        // دائماً نحول النتيجة إلى array حتى يسهل التعامل معها
        setResult(data[0]);
      } else {
        setResult(data);
        setFilteredCountries(data);
        localStorage.setItem("countries", JSON.stringify(data));
      }
    })
    .catch(() => setIsError(true))
    .finally(() => setIsLoading(false));
};


  const fetchDataFromLocalstorage = () => {
    const data = JSON.parse(localStorage.getItem("countries"));

    if (data) {
      setResult(data);
      setFilteredCountries(data);
    } else {
      fetchDataFromAPI();
    }
  };

  return {
    result,
    filteredCountries,
    setFilteredCountries,
    isLoading,
    isError,
  };
};
