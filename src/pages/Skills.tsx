import { Database, PanelsTopLeft, Cloud, ChartNoAxesCombined } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const copy = {
  pt: {
    eyebrow: "Sobre mim",
    title: "Engenharia com visão de negócio.",
    intro: "Sou Rafael Cerqueira, desenvolvedor com mais de 5 anos de experiência em software. Meu foco é backend com Node.js e TypeScript, sem perder de vista quem usa o produto.",
    description: "Também atuo com análise de dados no setor financeiro, conectando SQL, Power BI e contexto de negócio. Entre APIs, interfaces e dados, busco soluções claras e código que possa evoluir.",
    stack: "Ferramentas de trabalho",
    categories: ["Backend", "Frontend", "Infraestrutura", "Dados & BI"],
  },
  en: {
    eyebrow: "About me",
    title: "Engineering with business perspective.",
    intro: "I'm Rafael Cerqueira, a developer with over 5 years of experience in software. My focus is backend development with Node.js and TypeScript, while keeping the people using the product in mind.",
    description: "I also work in financial data analysis, connecting SQL, Power BI and business context. Across APIs, interfaces and data, I look for clear solutions and code that can evolve.",
    stack: "Tools of the trade",
    categories: ["Backend", "Frontend", "Infrastructure", "Data & BI"],
  },
} as const;

const skillCategories = [
  { icon: Database, skills: ["Node.js", "TypeScript", "Express", "Fastify", "NestJS", "REST API", "SOLID"] },
  { icon: PanelsTopLeft, skills: ["React", "Vue.js", "Next.js", "Vite", "Tailwind CSS", "UI/UX"] },
  { icon: Cloud, skills: ["Docker", "AWS EC2", "Elastic Beanstalk", "CodePipeline", "VPS", "CI/CD"] },
  { icon: ChartNoAxesCombined, skills: ["Power BI", "SQL", "PostgreSQL"] },
];

export function Skills() {
  const { language } = useLanguage();
  const content = copy[language];

  return (
    <section id="sobre" className="section about-section" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-copy" data-reveal>
          <p className="eyebrow"><span className="section-index">03 /</span> {content.eyebrow}</p>
          <h2 id="about-title" className="section-title">{content.title}</h2>
          <p className="about-intro">{content.intro}</p>
          <p className="section-description">{content.description}</p>
        </div>
        <div className="skills-panel" data-reveal>
          <p className="eyebrow">{content.stack}</p>
          <div className="skills-grid">
            {skillCategories.map((category, index) => (
              <div key={content.categories[index]} className="skill-category">
                <div className="skill-header"><category.icon size={20} className="skill-icon" aria-hidden="true" /><h3>{content.categories[index]}</h3></div>
                <ul className="skill-tags">{category.skills.map((skill) => <li key={skill} className="tag">{skill}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
