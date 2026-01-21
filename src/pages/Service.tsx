import { Code, Layout, BarChart3, Cloud } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function Service() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Code,
      title: t("services.backend"),
      description: t("services.backendDesc"),
    },
    {
      icon: Layout,
      title: t("services.frontend"),
      description: t("services.frontendDesc"),
    },
    {
      icon: BarChart3,
      title: t("services.bi"),
      description: t("services.biDesc"),
    },
    {
      icon: Cloud,
      title: t("services.devops"),
      description: t("services.devopsDesc"),
    },
  ];

  return (
    <div className="content-container">
      <h2 className="subtitle-page">{t("services.title")}</h2>
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.title} className="service-card">
            <service.icon size={40} className="service-icon" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Service };
