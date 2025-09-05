import CountryCard from "./CountryCard";
import EmptySearch from "./EmptySearch";

const CountryList = ({ data }) => {
  return (
    <div className="mt-8 grid justify-between gap-x-[70px] gap-y-12 md:mt-12 md:grid-cols-[repeat(2,minmax(0,_auto))] lg:grid-cols-[repeat(4,minmax(0,_auto))] lg:gap-y-[70px]">
      {data && data.length ? (
        data.map((country) => (
          <CountryCard
            key={country.cca3}          // ✅ المفتاح الفريد
            displayName={country.name?.common || country.displayName} 
            population={country.population}
            region={country.region}
            capital={country.capital}
            flag={country.flags.svg}
            tld={country.tld}
            cca3={country.cca3}         // ✅ رمز الدولة الفريد للترجمة
          />
        ))
      ) : (
        <EmptySearch />
      )}
    </div>
  );
};

export default CountryList;

