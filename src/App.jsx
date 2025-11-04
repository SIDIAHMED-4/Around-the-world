import { useEffect, useState } from "react";
import CountryList from "./Components/CountryList";
import Header from "./Components/header";
import RegionMenu from "./Components/RegionMenu";
import SearchInput from "./Components/SearchInput";
import ShowMessage from "./Components/ShowMessage";

const App = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    setIsloading(true);
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,languages",
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCountriesList(data);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsloading(false));
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <div className="container mx-auto px-5 md:px-0">
        {isError && <ShowMessage message= 'Something went wrong ! ' /> }
        {isLoading && <ShowMessage message= 'Loading countries data ... ! ' />  }
        {!isError && !isLoading && (
          <>
            <div className="flex flex-col justify-between gap-10 md:h-14 md:flex-row md:gap-0">
              <SearchInput />
              <RegionMenu />
            </div>
            <CountryList data={countriesList} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
