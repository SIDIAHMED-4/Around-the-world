import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CountryCard = ({ displayName, population, region, capital, flag, tld, cca3 }) => {
  const { t } = useTranslation();

  const translateCapital = (code, defaultValue) => t(`capital.${code}`, { defaultValue });

  return (
    <Link to={cca3}>
      <div className="h-full rounded bg-gray-50 p-3 pb-9 shadow-md dark:bg-gray-800 lg:w-[264px]">
        <img
          className="mb-4 h-40 w-full rounded-md"
          src={flag}
          alt={displayName}
          loading="lazy"
        />

        <h2 className="mb-4 ml-3 text-lg font-extrabold">{t(cca3, { defaultValue: displayName })}</h2>

        <div className="ml-3 flex flex-col gap-2">
          <p>
            <span className="font-semibold">{t("population")}: </span>
            <span className="font-light">{population?.toLocaleString() || "-"}</span>
          </p>
          <p>
            <span className="font-semibold">{t("region")}: </span>
            <span className="font-light">{t(region.toLowerCase(), { defaultValue: region })}</span>
          </p>
          <p>
            <span className="font-semibold">{t("capital")}: </span>
            <span className="font-light">{translateCapital(cca3.toLowerCase(), capital?.[0] || "-")}</span>
          </p>
          <p>
            <span className="font-semibold">{t("tld")}: </span>
            <span className="font-light">{tld?.join(", ") || "-"}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;

