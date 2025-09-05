import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const RegionMenu = ({ countriesList, filterCountriesList }) => {
  const { t, i18n } = useTranslation();
  const options = useMemo(
    () => [
      { value: "all", label: t("All regions") },
      { value: "Africa", label: t("africa") },
      { value: "Asia", label: t("asia") },
      { value: "Europe", label: t("europe") },
      { value: "Oceania", label: t("oceania") },
    ],
    [t],
  );

  const handleRegionChange = (e) => {
    const region = e.value; // القيمة دايمًا إنجليزية
    const filteredCountries =
      region === "all"
        ? countriesList
        : countriesList.filter((country) => country.region === region);

    filterCountriesList(filteredCountries);
  };

  const defaultValue = options[0];

  return (
    <Select
      key={i18n.language} // إعادة الرندر عند تغيير اللغة
      defaultValue={defaultValue}
      onChange={handleRegionChange}
      options={options}
      classNames={{
        input: () => "dark:!text-gray-100",
        singleValue: () => "dark:text-gray-100",
        control: () =>
          "flex h-12 items-center justify-between gap-12 rounded-md !border-none pl-4 pr-2 shadow dark:bg-gray-800 dark:text-gray-100 md:h-14",
        indicatorSeparator: () => "hidden",
        option: () => "hover:!text-gray-800",
        menu: () => "bg-gray-100 dark:bg-gray-800 dark:text-gray-100",
      }}
    />
  );
};

export default RegionMenu;
