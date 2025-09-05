import { useTranslation } from "react-i18next";

const Languages = () => {

    const { i18n } = useTranslation();

    const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.dir = lang === "ar" ? "rtl" : "ltr"; // عشان الاتجاه يتغير
  };
    return (
    <nav className="flex justify-around gap-2 rounded-full  shadow dark:bg-gray-700">
      <button
        onClick={() => changeLanguage("en")}
        className={`rounded px-1 py-1 ${
          i18n.language === "en"
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("ar")}
        className={`rounded px-1 py-1 ${
          i18n.language === "ar"
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        العربية
      </button>
    </nav>
  );
};

export default Languages;
