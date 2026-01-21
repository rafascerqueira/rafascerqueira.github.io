import { ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function Portfolio() {
  const { t } = useLanguage();

  const projects = [
    {
      title: "Vendinhas App",
      description: t("portfolio.vendinhasDesc"),
      image: "/vendinhas-app.webp",
      technologies: ["Node.js", "TypeScript", "React", "NestJS", "PostgreSQL"],
      link: "https://github.com/rafascerqueira",
    },
  ];

  return (
    <div className="content-container">
      <h2 className="subtitle-page">{t("portfolio.title")}</h2>
      <div className="portfolio-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card">
            <div className="project-image-wrapper">
              <img
                className="project-image"
                src={project.image}
                alt={project.title}
              />
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                <ExternalLink size={16} />
                {t("portfolio.viewProject")}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export { Portfolio };
