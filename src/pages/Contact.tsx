import { Linkedin, Github, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Contact() {
  const { t } = useLanguage();

  return (
    <div className="content-container">
      <h2 className="subtitle-page">{t("contact.title")}</h2>
      <div className="contact-me">
        <p>
          {t("contact.intro")} <strong>{t("contact.backend")}</strong>,{" "}
          <strong>{t("contact.fullstack")}</strong> {t("contact.or")}{" "}
          <strong>{t("contact.bi")}</strong>, {t("contact.connect")}
        </p>
        <p className="location-info">
          <MapPin size={18} /> {t("contact.location")}
        </p>
        <div className="contact-links">
          <a
            href="mailto:rafascerqueira.dev@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <Mail size={32} />
            <span>rafascerqueira.dev@gmail.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/rafascerqueira/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={32} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/rafascerqueira"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={32} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
