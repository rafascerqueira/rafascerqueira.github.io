import { useLanguage } from "../context/LanguageContext";

function Home() {
  const { t } = useLanguage();

  return (
    <div className="content-container">
      <h2 className="subtitle-page">{t("home.title")}</h2>
      <div className="home-content">
        <p className="intro-text">
          {t("home.intro")} <strong>Rafael Cerqueira</strong>, {t("home.role")}{" "}
          <strong>{t("home.experience")}</strong> {t("home.experienceDesc")}
        </p>
        <p>
          {t("home.specialization")} <strong>Node.js</strong> {t("home.and")}{" "}
          <strong>TypeScript</strong>, {t("home.apiDesc")}{" "}
          <strong>{t("home.solid")}</strong> {t("home.solidDesc")}
        </p>
        <p>
          {t("home.finance")} <strong>{t("home.dataAnalyst")}</strong>,{" "}
          {t("home.financeDesc")} <strong>{t("home.powerbi")}</strong>{" "}
          {t("home.financeDesc2")}
        </p>
        <p>
          {t("home.creator")} <strong>{t("home.vendinhas")}</strong>,{" "}
          {t("home.vendinhasDesc")}
        </p>
        <div className="highlights">
          <div className="highlight-item">
            <span className="highlight-number">5+</span>
            <span className="highlight-label">{t("home.yearsExp")}</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-number">{t("home.backend")}</span>
            <span className="highlight-label">{t("home.backendDesc")}</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-number">{t("home.bi")}</span>
            <span className="highlight-label">{t("home.biDesc")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Home };
