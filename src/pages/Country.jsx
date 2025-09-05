import { Link, useParams } from "react-router-dom";
import { useFetchData } from "../useFetchData";
import ShowMessage from "../components/ShowMessage";
import { useTranslation } from "react-i18next";

const Country = () => {
  const { t, i18n } = useTranslation();
  const { countryCode } = useParams();
  const { result, isLoading, isError } = useFetchData(countryCode);

  const formatNumber = (num) =>
    new Intl.NumberFormat(i18n.language).format(num || 0);

  const translateCapital = (code, defaultValue) =>
    t(`capital.${code}`, { defaultValue });

  return (
    <>
      {isError && <ShowMessage message={t("something_went_wrong")} />}
      {isLoading && <ShowMessage message={t("loading_countries_data")} />}
      {!isError && !isLoading && result && (
        <div>
          <Link
            className="mb-16 inline-block rounded-md bg-white p-3 md:mb-20"
            to="/"
          >
            {i18n.language === "ar" ? `${t("back")} →` : `← ${t("back")}`}
          </Link>

          <div className="grid gap-11 lg:grid-cols-2 lg:gap-36">
            <img
              className="w-full"
              src={result?.flags?.svg}
              alt={result?.flags?.alt || result?.displayName}
            />

            <div>
              <h1 className="mb-4 text-3xl font-extrabold lg:mb-7">
                {t(result.cca3, { defaultValue: result?.name?.common })}
              </h1>

              <div className="flex flex-col gap-8 md:gap-40 lg:flex-row">
                <div className="flex flex-col gap-5">
                  <p>
                    <span className="font-semibold">{t("population")}: </span>
                    <span className="font-light">
                      {formatNumber(result?.population)}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">{t("region")}: </span>
                    <span>
                      {t(result?.region.toLowerCase(), {
                        defaultValue: result?.region,
                      })}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">{t("subregion")}: </span>
                    <span>
                      {t(result?.subregion, {
                        defaultValue: result?.subregion,
                      })}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">{t("capital")}: </span>
                    <span>
                      {translateCapital(
                        result.cca3.toLowerCase(),
                        result.capital?.[0] || "-",
                      )}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <p>
                    <span className="font-semibold">
                      {t("top_level_domain")}:{" "}
                    </span>
                    <span>{result?.tld?.join(", ") || "-"}</span>
                  </p>

                  <p>
                    <span className="font-semibold">{t("currencies")}: </span>
                    <span className="font-thin">
                      {result?.currencies
                        ? Object.keys(result.currencies)
                            .map((currency) =>
                              t(currency.toLowerCase(), {
                                defaultValue: result.currencies[currency].name,
                              }),
                            )
                            .join(", ")
                        : "-"}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">{t("languages")}: </span>
                    <span className="font-thin">
                      {result?.languages
                        ? Object.values(result.languages)
                            .map((lang) =>
                              t(lang.toLowerCase(), { defaultValue: lang }),
                            )
                            .join(", ")
                        : "-"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Country;
