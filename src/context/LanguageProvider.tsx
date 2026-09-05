import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { LanguageContext, translate } from "./LanguageContext";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const language = /^\/en(?:\/|$)/.test(pathname) ? "en" : "pt";
  const toggleLanguage = () => {
    const next = language === "en" ? pathname.replace(/^\/en/, "") || "/" : `/en${pathname}`;
    void navigate(`${next}${search}${hash}`, { preventScrollReset: true });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: (key) => translate(language, key) }}>
      {children}
    </LanguageContext.Provider>
  );
}
