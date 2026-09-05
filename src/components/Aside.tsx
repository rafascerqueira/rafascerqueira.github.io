import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const sections = ["projetos", "atuacao", "sobre", "contato"];

export function Aside() {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const home = language === "en" ? "/en/" : "/";
  const english = language === "en";
  const labels = english ? ["Projects", "Expertise", "About", "Contact"] : ["Projetos", "Atuação", "Sobre", "Contato"];
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -60% 0px" });
    for (const id of ["inicio", ...sections]) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 761px)");
    const closeOnDesktop = () => { if (media.matches) dialog.current?.close(); };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  const closeMenu = () => dialog.current?.close();
  const isActive = (id: string) => pathname.includes("/projetos/") ? id === "projetos" : active === id;
  const links = sections.map((id, index) => (
    <Link key={id} to={`${home}#${id}`} className="nav-link" aria-current={isActive(id) ? "location" : undefined} onClick={closeMenu}>
      {labels[index]}
    </Link>
  ));

  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link to={home} className="brand" aria-label={english ? "Rafael Cerqueira, home" : "Rafael Cerqueira, início"}>
          <span className="brand-mark" aria-hidden="true">rc<span>.</span></span>
          <span className="brand-name">Rafael Cerqueira<span>Software Engineer</span></span>
        </Link>
        <nav className="desktop-nav" aria-label={english ? "Main navigation" : "Navegação principal"}>{links}</nav>
        <div className="header-controls">
          <button className="icon-button theme-toggle" type="button" onClick={toggleTheme} aria-label={english ? (theme === "light" ? "Enable dark theme" : "Enable light theme") : (theme === "light" ? "Ativar modo escuro" : "Ativar modo claro")}>
            <Sun className="theme-sun" size={18} aria-hidden="true" /><Moon className="theme-moon" size={18} aria-hidden="true" />
          </button>
          <button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={english ? "Mudar para português" : "Switch to English"} lang={english ? "pt-BR" : "en"}>
            <span className={english ? "" : "selected"}>PT</span><span aria-hidden="true">/</span><span className={english ? "selected" : ""}>EN</span>
          </button>
          <button ref={menuButton} className="icon-button menu-toggle" type="button" aria-label={english ? "Open menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => { dialog.current?.showModal(); setOpen(true); }}>
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </div>
      <dialog ref={dialog} id="mobile-navigation" className="mobile-dialog" aria-label={english ? "Navigation menu" : "Menu de navegação"} onClose={() => { setOpen(false); menuButton.current?.focus({ preventScroll: true }); }} onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const items = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const first = items[0];
        const last = items[items.length - 1];
        const target = event.shiftKey && document.activeElement === first ? last : !event.shiftKey && document.activeElement === last ? first : null;
        if (target) { event.preventDefault(); target.focus(); }
      }}>
        <div className="mobile-dialog-heading"><span className="eyebrow">{english ? "Explore" : "Explore"}</span><button className="icon-button" type="button" onClick={closeMenu} aria-label={english ? "Close menu" : "Fechar menu"} autoFocus><X size={24} aria-hidden="true" /></button></div>
        <nav aria-label={english ? "Mobile navigation" : "Navegação mobile"}>{links}</nav>
        <a className="text-link" href="mailto:rafascerqueira.dev@gmail.com">{english ? "Let's talk" : "Vamos conversar"}<ArrowUpRight size={18} aria-hidden="true" /></a>
      </dialog>
    </header>
  );
}
