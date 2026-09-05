import { Braces, PanelsTopLeft, ChartNoAxesCombined, Cloud } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const copy = {
  pt: {
    eyebrow: "Atuação",
    title: "Da lógica ao produto.",
    description: "Uma base forte em backend, com visão de ponta a ponta sobre aplicações e dados.",
    services: [
      { title: "Backend", description: "APIs REST com Node.js e TypeScript. Express, Fastify e NestJS, com princípios SOLID e atenção à manutenção.", tags: ["Node.js", "TypeScript", "APIs REST"] },
      { title: "Fullstack", description: "Interfaces com React, Vue e Next.js, conectadas à lógica da aplicação. Cuidado com a experiência e a consistência visual.", tags: ["React", "Vue", "Next.js"] },
      { title: "Dados & BI", description: "Análise de dados no setor financeiro. SQL e Power BI para dar contexto às vendas e apoiar decisões de negócio.", tags: ["Power BI", "SQL", "PostgreSQL"] },
      { title: "Infraestrutura", description: "Ambientes com Docker e deploys em AWS e VPS. Integração e entrega contínuas como parte do desenvolvimento.", tags: ["Docker", "AWS", "CI/CD"] },
    ],
  },
  en: {
    eyebrow: "Expertise",
    title: "From logic to product.",
    description: "A strong backend foundation, with an end-to-end perspective on applications and data.",
    services: [
      { title: "Backend", description: "REST APIs with Node.js and TypeScript. Express, Fastify and NestJS, with SOLID principles and a focus on maintainability.", tags: ["Node.js", "TypeScript", "REST APIs"] },
      { title: "Fullstack", description: "Interfaces built with React, Vue and Next.js, connected to application logic. Attention to user experience and visual consistency.", tags: ["React", "Vue", "Next.js"] },
      { title: "Data & BI", description: "Data analysis in the financial sector. SQL and Power BI to give sales context and support business decisions.", tags: ["Power BI", "SQL", "PostgreSQL"] },
      { title: "Infrastructure", description: "Docker environments and AWS and VPS deployments. Continuous integration and delivery as part of development.", tags: ["Docker", "AWS", "CI/CD"] },
    ],
  },
} as const;

const icons = [Braces, PanelsTopLeft, ChartNoAxesCombined, Cloud];

export function Service() {
  const { language } = useLanguage();
  const content = copy[language];

  return (
    <section id="atuacao" className="section expertise-section" aria-labelledby="expertise-title">
      <div className="container">
        <div className="section-heading" data-reveal>
          <p className="eyebrow"><span className="section-index">02 /</span> {content.eyebrow}</p>
          <h2 id="expertise-title" className="section-title">{content.title}</h2>
          <p className="section-description">{content.description}</p>
        </div>
        <div className="services-grid">
          {content.services.map((service, index) => {
            const Icon = icons[index];
            return (
              <article className="service-card" key={service.title} data-reveal>
                <div className="service-card-top"><Icon className="service-icon" size={26} aria-hidden="true" /><span className="section-index" aria-hidden="true">0{index + 1}</span></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-tags">{service.tags.map((tag) => <li className="tag" key={tag}>{tag}</li>)}</ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Service;
