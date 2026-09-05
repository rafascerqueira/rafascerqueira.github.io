import { ArrowUpRight } from "lucide-react";
import { Link, Outlet } from "react-router";
import { Aside } from "./components/Aside";
import { useLanguage } from "./context/LanguageContext";
import { LanguageProvider } from "./context/LanguageProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import NavigationEffects from "./main";

function Site() {
  const { language } = useLanguage();
  const english = language === "en";
  return (
    <>
      <a className="skip-link" href="#main-content">{english ? "Skip to content" : "Pular para o conteúdo"}</a>
      <Aside />
      <main id="main-content" tabIndex={-1}><Outlet /></main>
      <footer className="site-footer container">
        <div><Link className="footer-name" to={english ? "/en/" : "/"}>Rafael Cerqueira<span>.</span></Link><p>{english ? "Code, products and real-world problems." : "Código, produtos e problemas reais."}</p></div>
        <div className="footer-links"><a href="https://github.com/rafascerqueira" target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={15} aria-hidden="true" /></a><a href="https://www.linkedin.com/in/rafascerqueira/" target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={15} aria-hidden="true" /></a></div>
        <p className="footer-note">{english ? "Made with React. Hosted on GitHub Pages." : "Feito com React. Publicado no GitHub Pages."}</p>
      </footer>
      <NavigationEffects />
    </>
  );
}

export default function App() {
  return <ThemeProvider><LanguageProvider><Site /></LanguageProvider></ThemeProvider>;
}
