import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Braces, PanelsTopLeft, ChartNoAxesCombined, Cloud } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const copy = {
  pt: {
    eyebrow: "Atuação",
    title: "Da lógica ao produto.",
    description: "Uma base forte em backend, com visão de ponta a ponta sobre aplicações e dados.",
    hint: "Explore as camadas",
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
    hint: "Explore the layers",
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
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const count = content.services.length;

  function select(index: number, focus = false) {
    setActive(index);
    if (focus) tabs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent) {
    const next = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: count - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select((next + count) % count, true);
  }

  return (
    <section id="atuacao" className="section expertise-section" aria-labelledby="expertise-title">
      <div className="container">
        <div className="section-heading" data-reveal>
          <p className="eyebrow"><span className="section-index">02 /</span> {content.eyebrow}</p>
          <h2 id="expertise-title" className="section-title">{content.title}</h2>
          <p className="section-description">{content.description}</p>
        </div>
        <div className="expertise-diagram" data-reveal style={{ "--active": active, "--count": count } as CSSProperties}>
          <div className="expertise-tabs" role="tablist" aria-orientation="vertical" aria-label={content.hint} onKeyDown={onKeyDown}>
            <span className="expertise-marker" aria-hidden="true" />
            {content.services.map((service, index) => {
              const Icon = icons[index];
              return (
                <button
                  key={service.title}
                  ref={(element) => { tabs.current[index] = element; }}
                  className="expertise-tab"
                  type="button"
                  role="tab"
                  id={`expertise-tab-${index}`}
                  aria-selected={active === index}
                  aria-controls={`expertise-panel-${index}`}
                  tabIndex={active === index ? 0 : -1}
                  onClick={() => select(index)}
                  onPointerEnter={(event) => { if (event.pointerType === "mouse") select(index); }}
                >
                  <span className="expertise-num" aria-hidden="true">0{index + 1}</span>
                  <span className="expertise-name">{service.title}</span>
                  <Icon className="expertise-icon" size={22} aria-hidden="true" />
                </button>
              );
            })}
          </div>
          <div className="expertise-panels">
            {content.services.map((service, index) => {
              const Icon = icons[index];
              return (
                <div key={service.title} className="expertise-panel" role="tabpanel" id={`expertise-panel-${index}`} aria-labelledby={`expertise-tab-${index}`} hidden={active !== index}>
                  <Icon className="expertise-panel-icon" size={44} strokeWidth={1.25} aria-hidden="true" />
                  <p className="expertise-panel-text">{service.description}</p>
                  <ul className="service-tags">{service.tags.map((tag) => <li className="tag" key={tag}>{tag}</li>)}</ul>
                  <span className="expertise-panel-count" aria-hidden="true">0{index + 1} / 0{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;
