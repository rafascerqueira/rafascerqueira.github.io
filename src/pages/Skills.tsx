import { Database, PanelsTopLeft, Cloud, ChartNoAxesCombined } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ScrubWords } from "../components/Words";

const copy = {
  pt: {
    eyebrow: "Sobre mim",
    title: "Engenharia com visão de negócio.",
    intro: "Sou Rafael Cerqueira, desenvolvedor fullstack no Rio de Janeiro. Trabalho com web desde 2012 e com Node.js e TypeScript desde 2019.",
    description: "Há 11 anos na MG Cred, evoluí do backoffice e antifraude para a TI, onde desenvolvo sistemas e dashboards usados da loja ao CEO, com Python, Streamlit, SQL, Next.js e Power BI quando faz sentido. Fora do trabalho, mantenho o Vendinhas App como projeto open source.",
    stack: "Ferramentas de trabalho",
    categories: ["Backend", "Frontend", "Infraestrutura", "Dados & BI"],
  },
  en: {
    eyebrow: "About me",
    title: "Engineering with business perspective.",
    intro: "I'm Rafael Cerqueira, a fullstack developer in Rio de Janeiro. I have worked on the web since 2012 and with Node.js and TypeScript since 2019.",
    description: "For 11 years at MG Cred I moved from backoffice and anti-fraud into IT, where I build systems and dashboards used from the store to the CEO, with Python, Streamlit, SQL, Next.js and Power BI when it makes sense. Outside work, I maintain Vendinhas App as an open source project.",
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
