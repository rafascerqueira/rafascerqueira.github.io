import { ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import { Link } from "react-router";
import { ProjectCover } from "../components/ProjectCover";
import { useLanguage } from "../context/LanguageContext";
import { projects } from "../data/projects";

const copy = {
  pt: {
    eyebrow: "Projetos selecionados",
    title: "Software que encontra a vida real.",
    description: "Produtos, aplicações e dados. Uma seleção do que venho construindo.",
    details: "Explorar projeto",
    visit: "Abrir aplicação",
    restricted: "Acesso restrito",
    login: "Abrir página de acesso",
    contact: "Conversar sobre o projeto",
  },
  en: {
    eyebrow: "Selected projects",
    title: "Software that meets real life.",
    description: "Products, applications and data. A selection of what I have been building.",
    details: "Explore project",
    visit: "Open application",
    restricted: "Restricted access",
    login: "Open login page",
    contact: "Talk about the project",
  },
} as const;

export function Portfolio() {
  const { language } = useLanguage();
  const content = copy[language];
  const home = language === "en" ? "/en/" : "/";

  return (
    <section id="projetos" className="section portfolio-section" aria-labelledby="portfolio-title">
      <div className="container">
        <div className="section-heading" data-reveal>
          <p className="eyebrow"><span className="section-index">01 /</span> {content.eyebrow}</p>
          <h2 id="portfolio-title" className="section-title">{content.title}</h2>
          <p className="section-description">{content.description}</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => {
            const text = project.copy[language];
            return (
              <article key={project.slug} className={`project-card${project.featured ? " project-card-featured" : ""}`} data-reveal>
                <ProjectCover project={project} />
                <div className="project-card-body">
                  <div className="project-card-top">
                    <p className="project-category">{text.category}</p>
                    <span className="project-number" aria-hidden="true">0{index + 1}</span>
                  </div>
                  <h3 className="project-title">{text.title}</h3>
                  <p className="project-description">{text.summary}</p>
                  {project.technologies.length > 0 && (
                    <ul className="project-tags">
                      {project.technologies.map((technology) => <li className="tag" key={technology}>{technology}</li>)}
                    </ul>
                  )}
                  {project.restricted && <p className="project-access"><LockKeyhole size={14} aria-hidden="true" /> {content.restricted}</p>}
                  <div className="project-actions">
                    <Link className="text-link" to={`${home}projetos/${project.slug}/`} viewTransition aria-label={`${content.details}: ${text.title}`}>
                      {content.details}<ArrowRight size={17} aria-hidden="true" />
                    </Link>
                    {project.externalUrl ? (
                      <a className="text-link project-external-link" href={project.externalUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.restricted ? content.login : content.visit}: ${text.title}`}>
                        {project.restricted ? content.login : content.visit}<ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    ) : (
                      <Link className="text-link project-external-link" to={`${home}#contato`}>{content.contact}<ArrowUpRight size={16} aria-hidden="true" /></Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
