import { Database, PanelsTopLeft, Cloud, ChartNoAxesCombined } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ScrubWords } from "../components/Words";

const copy = {
  pt: {
    eyebrow: "Sobre mim",
    title: "Engenharia com visão de negócio.",
    intro: "Transformo planilhas e processos manuais em sistemas e painéis que as pessoas realmente usam, da loja ao CEO.",
    description: "Sou Rafael Cerqueira, desenvolvedor fullstack. Construo APIs e aplicações web com Node.js e TypeScript e entrego dados com Python, SQL e Power BI. Já levei indicadores a 47 lojas e à diretoria e reduzi de um expediente inteiro para alguns minutos uma rotina de fechamento. Trabalho há 11 anos no setor financeiro, do backoffice à TI, e por isso entendo o problema do negócio antes de escrever a primeira linha. Também mantenho o Vendinhas, um SaaS open source.",
    stack: "Ferramentas de trabalho",
    categories: ["Backend", "Frontend", "Infraestrutura", "Dados & BI"],
  },
  en: {
    eyebrow: "About me",
    title: "Engineering with business perspective.",
    intro: "I turn spreadsheets and manual processes into systems and dashboards people actually use, from the store floor to the CEO.",
    description: "I'm Rafael Cerqueira, a fullstack developer. I build APIs and web applications with Node.js and TypeScript and deliver data with Python, SQL and Power BI. I've brought indicators to 47 stores and to executive management, and cut a monthly closing routine from a full workday to a few minutes. After 11 years in the financial sector, from backoffice to IT, I understand the business problem before writing the first line. I also maintain Vendinhas, an open source SaaS.",
    stack: "Tools of the trade",
    categories: ["Backend", "Frontend", "Infrastructure", "Data & BI"],
  },
} as const;

const skillCategories = [
  { icon: Database, skills: ["Node.js", "TypeScript", "Express", "Fastify", "NestJS", "Prisma", "REST API", "SOLID", "Jest", "Vitest"] },
  { icon: PanelsTopLeft, skills: ["React", "Next.js", "Vite", "Tailwind CSS"] },
  { icon: Cloud, skills: ["Docker", "VPS", "CI/CD"] },
  { icon: ChartNoAxesCombined, skills: ["Python", "Streamlit", "Power BI", "SQL", "PostgreSQL"] },
];

export function Skills() {
  const { language } = useLanguage();
  const content = copy[language];

  return (
    <section id="sobre" className="section about-section" aria-labelledby="about-title">
      <div className="container">
        <div className="section-heading" data-reveal>
          <p className="eyebrow"><span className="section-index">03 /</span> {content.eyebrow}</p>
          <h2 id="about-title" className="section-title">{content.title}</h2>
        </div>
        <p className="about-statement"><ScrubWords text={content.intro} /></p>
        <div className="about-grid">
          <p className="section-description about-description" data-reveal>{content.description}</p>
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
      </div>
    </section>
  );
}

export default Skills;
