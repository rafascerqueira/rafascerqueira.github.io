import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, MapPin, Linkedin, Github, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const menuItems = [
  { key: "menu.home", route: "/" },
  { key: "menu.services", route: "/service" },
  { key: "menu.skills", route: "/skills" },
  { key: "menu.portfolio", route: "/portfolio" },
  { key: "menu.contact", route: "/contact" },
];

function Aside() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const handleMenu = () => setIsOpenMenu(!isOpenMenu);

  return (
    <aside className="aside">
      <img
        className="profile-pic"
        src="/profile-pic.webp"
        width={180}
        height={180}
        alt="Foto de Rafael Cerqueira"
      />
      <h1 className="main-title">Rafael Cerqueira</h1>
      <h2 className="subtitles">Software Engineer</h2>
      <div className="located">
        <MapPin size={18} className="pin-icon" />
        <span className="address">Rio de Janeiro - Brazil</span>
      </div>
      <div className="social-links">
        <a
          href="https://www.linkedin.com/in/rafascerqueira/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="https://github.com/rafascerqueira"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github size={24} />
        </a>
      </div>
      <nav>
        <ul className="aside-menu">
          {menuItems.map((menu) => (
            <li key={menu.route}>
              <NavLink
                to={menu.route}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  opacity: isActive ? 1 : 0.7,
                })}
              >
                {t(menu.key)}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className={isOpenMenu ? `mobile-menu show-menu` : `mobile-menu`}>
          <button type="button" className="menu-close" onClick={handleMenu} aria-label="Fechar menu">
            <X size={32} />
          </button>
          {menuItems.map((menu) => (
            <li key={menu.route}>
              <NavLink
                to={menu.route}
                onClick={handleMenu}
                style={({ isActive }) => ({
                  color: "#ebd5d5",
                  textDecoration: "none",
                  opacity: isActive ? 1 : 0.7,
                  textShadow: isActive ? "1px 1px 2px" : "",
                })}
              >
                {t(menu.key)}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={isOpenMenu ? `menu-open hidden` : `menu-open`}
          onClick={handleMenu}
          aria-label="Abrir menu"
        >
          <Menu size={32} />
        </button>
      </nav>
      <div className="aside-controls">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
          title={theme === "light" ? "Modo escuro" : "Modo claro"}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button
          type="button"
          className="lang-switch"
          onClick={toggleLanguage}
          aria-label={language === "pt" ? "Switch to English" : "Mudar para Português"}
        >
          {language === "pt" ? "🇧🇷 PT" : "🇺🇸 EN"}
        </button>
      </div>
    </aside>
  );
}

export { Aside };
