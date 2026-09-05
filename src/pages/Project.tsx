import { ArrowLeft, ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import { Link, useParams } from "react-router";
import { ProjectCover } from "../components/ProjectCover";
import { useLanguage } from "../context/LanguageContext";
import { getProject, projects } from "../data/projects";
import NotFound from "./NotFound";

const copy = {
  pt: {
    back: "Voltar aos projetos",
    overview: "Sobre o projeto",
    highlights: "O que faz parte",
    technologies: "Tecnologias",
    owner: "Desenvolvido por",
    deployment: "Hospedagem",
    restricted: "Acesso restrito",
    visit: "Abrir aplicação",
    login: "Abrir página de acesso",
    contact: "Conversar sobre o projeto",
    cta: "Quer conhecer os detalhes técnicos?",
    ctaDescription: "Vamos conversar sobre o projeto, as escolhas de desenvolvimento e o que você está construindo.",
    more: "Outros projetos",
    explore: "Explorar projeto",
  },
  en: {
    back: "Back to projects",
    overview: "About the project",
    highlights: "What's included",
    technologies: "Technologies",
    owner: "Developed by",
    deployment: "Hosting",
    restricted: "Restricted access",
    visit: "Open application",
    login: "Open login page",
    contact: "Talk about the project",
    cta: "Want to explore the technical details?",
    ctaDescription: "Let's talk about the project, development choices and what you are building.",
    more: "Other projects",
    explore: "Explore project",
  },
} as const;

export default function Project() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const project = getProject(slug);

  if (!project) return <NotFound />;

  const content = copy[language];
  const text = project.copy[language];
  const home = language === "en" ? "/en/" : "/";

  return (
    <article className="project-detail">
      <section className="section project-detail-hero" aria-labelledby="project-heading">
        <div className="container">
          <Link className="text-link project-back" to={`${home}#projetos`} viewTransition><ArrowLeft size={17} aria-hidden="true" />{content.back}</Link>
          <div className="project-detail-heading">
            <p className="eyebrow">{text.category}</p>
            <h1 id="project-heading" className="project-detail-title">{text.title}</h1>
            <p className="section-description">{text.summary}</p>
            <div className="project-detail-actions">
              {project.externalUrl && (
                <a className="button button-primary" href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                  {project.restricted ? content.login : content.visit}<ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}
              <Link className={`button ${project.externalUrl ? "button-secondary" : "button-primary"}`} to={`${home}#contato`}>{content.contact}<ArrowRight size={18} aria-hidden="true" /></Link>
              {project.restricted && <span className="project-access"><LockKeyhole size={14} aria-hidden="true" />{content.restricted}</span>}
            </div>
          </div>
          <ProjectCover project={project} eager />
        </div>
      </section>
      <section className="section project-overview" aria-labelledby="project-overview-title">
        <div className="container project-overview-grid">
          <div className="project-overview-copy" data-reveal>
            <h2 id="project-overview-title" className="section-title">{content.overview}</h2>
            <p className="section-description">{text.context}</p>
            <h3 className="project-highlights-title">{content.highlights}</h3>
            <ul className="project-highlights">
              {text.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
          <dl className="project-facts" data-reveal>
            <div><dt>{content.owner}</dt><dd>{project.owner}</dd></div>
            {project.technologies.length > 0 && (
              <div><dt>{content.technologies}</dt><dd><ul className="project-tags">{project.technologies.map((technology) => <li className="tag" key={technology}>{technology}</li>)}</ul></dd></div>
            )}
            {project.deployment && <div><dt>{content.deployment}</dt><dd>{project.deployment}</dd></div>}
          </dl>
        </div>
      </section>
      <section className="section project-cta" aria-labelledby="project-cta-title">
        <div className="container project-cta-inner" data-reveal>
          <div><h2 id="project-cta-title" className="section-title">{content.cta}</h2><p className="section-description">{content.ctaDescription}</p></div>
          <Link className="button button-primary" to={`${home}#contato`}>{content.contact}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
      <section className="section related-projects" aria-labelledby="related-projects-title">
        <div className="container" data-reveal>
          <h2 id="related-projects-title" className="section-title">{content.more}</h2>
          <div className="related-projects-grid">
            {projects.filter((other) => other.slug !== project.slug).map((other) => (
              <Link key={other.slug} className="related-project-link" to={`${home}projetos/${other.slug}/`} viewTransition aria-label={`${content.explore}: ${other.copy[language].title}`}>
                <span><span className="project-category">{other.copy[language].category}</span><span className="project-title">{other.copy[language].title}</span></span>
                <ArrowUpRight size={24} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
