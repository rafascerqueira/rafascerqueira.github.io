import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { ProjectCover } from "../components/ProjectCover";
import { useLanguage } from "../context/LanguageContext";
import { getProject } from "../data/projects";
import { Contact } from "./Contact";
import { Portfolio } from "./Portfolio";
import { Service } from "./Service";
import { Skills } from "./Skills";

const copy = {
  pt: {
    headline: "Código com propósito.",
    accent: "Produtos com impacto.",
    description: "Sou Rafael Cerqueira. Desenvolvo aplicações com Node.js e TypeScript e conecto engenharia de software e business intelligence para resolver problemas de negócio.",
    projects: "Explorar projetos",
    contact: "Vamos conversar",
    identity: "Backend, produtos e dados.",
    featured: "Em foco",
    explore: "Conhecer Vendinhas App",
    architecture: ["Interface", "Aplicação", "Dados"],
  },
  en: {
    headline: "Code with purpose.",
    accent: "Products with impact.",
    description: "I'm Rafael Cerqueira. I build applications with Node.js and TypeScript, connecting software engineering and business intelligence to solve business problems.",
    projects: "Explore projects",
    contact: "Let's talk",
    identity: "Backend, products and data.",
    featured: "In focus",
    explore: "Explore Vendinhas App",
    architecture: ["Interface", "Application", "Data"],
  },
} as const;

export function Home() {
  const { language } = useLanguage();
  const content = copy[language];
  const home = language === "en" ? "/en/" : "/";
  const featured = getProject("vendinhas-app");

  return (
    <>
      <section id="inicio" className="section hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Software Engineer</p>
            <h1 id="hero-title" className="hero-title">{content.headline}<br /><span>{content.accent}</span></h1>
            <p className="hero-description">{content.description}</p>
            <div className="hero-actions">
              <Link className="button button-primary" to={`${home}#projetos`}>{content.projects}<ArrowDown size={18} aria-hidden="true" /></Link>
              <Link className="button button-secondary" to={`${home}#contato`}>{content.contact}<ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
            <div className="hero-identity">
              <img className="hero-portrait" src="/profile-pic.webp" alt="Rafael Cerqueira" width={64} height={64} decoding="async" />
              <div><strong>Rafael Cerqueira</strong><span>{content.identity}</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-architecture" aria-hidden="true">
              <span className="hero-architecture-mark">&#123; rc &#125;</span>
              <div className="hero-architecture-layers">{content.architecture.map((layer) => <span key={layer}>{layer}</span>)}</div>
              <span className="hero-architecture-caption">Node.js / TypeScript / BI</span>
            </div>
            {featured && (
              <div className="hero-feature">
                <div className="hero-feature-top"><span className="eyebrow">{content.featured}</span><span className="tag">Fullstack</span></div>
                <ProjectCover project={featured} sharedTransition={false} eager />
                <Link className="hero-feature-link" to={`${home}projetos/${featured.slug}/`} viewTransition aria-label={content.explore}>
                  <span>{featured.copy[language].title}</span><ArrowUpRight size={22} aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      <Portfolio />
      <Service />
      <Skills />
      <Contact />
    </>
  );
}

export default Home;
