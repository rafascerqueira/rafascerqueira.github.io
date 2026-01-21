import { Database, Layout, Cloud, BarChart3 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function Skills() {
  const { t } = useLanguage();

  const skillCategories = [
    {
      icon: Database,
      title: t("skills.backend"),
      skills: ["Node.js", "TypeScript", "Express", "Fastify", "NestJS", "REST API", "SOLID"],
    },
    {
      icon: Layout,
      title: t("skills.frontend"),
      skills: ["React.js", "Vue.js", "Next.js", "Vite", "TailwindCSS", "UI/UX"],
    },
    {
      icon: Cloud,
      title: t("skills.infra"),
      skills: ["Docker", "AWS EC2", "Elastic Beanstalk", "Code Pipeline", "VPS", "CI/CD"],
    },
    {
      icon: BarChart3,
      title: t("skills.data"),
      skills: ["Power BI", "Dashboards", "SQL", "PostgreSQL"],
    },
  ];

  return (
    <div className="content-container">
      <h2 className="subtitle-page">{t("skills.title")}</h2>
      <div className="skills-grid">
        {skillCategories.map((category) => (
          <div key={category.title} className="skill-category">
            <div className="skill-header">
              <category.icon size={28} className="skill-icon" />
              <h3>{category.title}</h3>
            </div>
            <div className="skill-tags">
              {category.skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Skills };
