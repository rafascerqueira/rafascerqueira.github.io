import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Menu
    "menu.home": "Início",
    "menu.services": "Serviços",
    "menu.skills": "Habilidades",
    "menu.portfolio": "Portfólio",
    "menu.contact": "Contato",

    // Home
    "home.title": "Sobre mim",
    "home.intro": "Olá! Sou",
    "home.role": "desenvolvedor backend com mais de",
    "home.experience": "5 anos de experiência",
    "home.experienceDesc": "em programação e desenvolvimento de software.",
    "home.specialization": "Especializado em",
    "home.and": "e",
    "home.apiDesc": "crio APIs REST robustas utilizando frameworks como Express, Fastify e NestJS, sempre seguindo princípios",
    "home.solid": "SOLID",
    "home.solidDesc": "para garantir escalabilidade e manutenção.",
    "home.finance": "No setor financeiro, atuo como",
    "home.dataAnalyst": "analista de dados",
    "home.financeDesc": "criando dashboards interativos no",
    "home.powerbi": "Power BI",
    "home.financeDesc2": "que otimizam análises de vendas e suportam decisões estratégicas.",
    "home.creator": "Criador do",
    "home.vendinhas": "Vendinhas App",
    "home.vendinhasDesc": "solução para gestão de vendas e estoques voltada a autônomos e pequenos negócios.",
    "home.yearsExp": "Anos de experiência",
    "home.backend": "Backend",
    "home.backendDesc": "Node.js & TypeScript",
    "home.bi": "BI",
    "home.biDesc": "Power BI & Dados",

    // Services
    "services.title": "Serviços",
    "services.backend": "Backend Development",
    "services.backendDesc": "APIs REST robustas com Node.js e TypeScript usando Express, Fastify e NestJS. Código limpo seguindo princípios SOLID para escalabilidade.",
    "services.frontend": "Frontend & Fullstack",
    "services.frontendDesc": "Interfaces modernas com React.js, Vue.js, Next.js e TailwindCSS. Padronização UI/UX para projetos fullstack completos.",
    "services.bi": "Business Intelligence",
    "services.biDesc": "Dashboards interativos no Power BI para análise de vendas e suporte a decisões estratégicas no setor financeiro.",
    "services.devops": "DevOps & Infraestrutura",
    "services.devopsDesc": "Docker para ambientes de teste e produção. Deploys em VPS e AWS (Elastic Beanstalk, Code Pipeline, EC2).",

    // Skills
    "skills.title": "Habilidades",
    "skills.backend": "Backend",
    "skills.frontend": "Frontend",
    "skills.infra": "Infraestrutura",
    "skills.data": "Dados & BI",

    // Portfolio
    "portfolio.title": "Portfólio",
    "portfolio.vendinhasDesc": "Solução completa para gestão de vendas e estoques voltada a autônomos e pequenos negócios. Simplifica o faturamento e organização diária, permitindo controle total das operações comerciais.",
    "portfolio.viewProject": "Ver projeto",

    // Contact
    "contact.title": "Contato",
    "contact.intro": "Busco conexões para inovar em projetos de tecnologia e análise de dados. Se você precisa de soluções customizadas em",
    "contact.backend": "backend",
    "contact.fullstack": "fullstack",
    "contact.or": "ou",
    "contact.bi": "BI",
    "contact.connect": "vamos conectar!",
    "contact.location": "Rio de Janeiro ou Remoto",
  },
  en: {
    // Menu
    "menu.home": "Home",
    "menu.services": "Services",
    "menu.skills": "Skills",
    "menu.portfolio": "Portfolio",
    "menu.contact": "Contact",

    // Home
    "home.title": "About me",
    "home.intro": "Hi! I'm",
    "home.role": "a backend developer with over",
    "home.experience": "5 years of experience",
    "home.experienceDesc": "in programming and software development.",
    "home.specialization": "Specialized in",
    "home.and": "and",
    "home.apiDesc": "I create robust REST APIs using frameworks like Express, Fastify, and NestJS, always following",
    "home.solid": "SOLID",
    "home.solidDesc": "principles to ensure scalability and maintainability.",
    "home.finance": "In the financial sector, I work as a",
    "home.dataAnalyst": "data analyst",
    "home.financeDesc": "creating interactive dashboards in",
    "home.powerbi": "Power BI",
    "home.financeDesc2": "that optimize sales analysis and support strategic decisions.",
    "home.creator": "Creator of",
    "home.vendinhas": "Vendinhas App",
    "home.vendinhasDesc": "a solution for sales and inventory management aimed at freelancers and small businesses.",
    "home.yearsExp": "Years of experience",
    "home.backend": "Backend",
    "home.backendDesc": "Node.js & TypeScript",
    "home.bi": "BI",
    "home.biDesc": "Power BI & Data",

    // Services
    "services.title": "Services",
    "services.backend": "Backend Development",
    "services.backendDesc": "Robust REST APIs with Node.js and TypeScript using Express, Fastify, and NestJS. Clean code following SOLID principles for scalability.",
    "services.frontend": "Frontend & Fullstack",
    "services.frontendDesc": "Modern interfaces with React.js, Vue.js, Next.js, and TailwindCSS. UI/UX standardization for complete fullstack projects.",
    "services.bi": "Business Intelligence",
    "services.biDesc": "Interactive dashboards in Power BI for sales analysis and strategic decision support in the financial sector.",
    "services.devops": "DevOps & Infrastructure",
    "services.devopsDesc": "Docker for test and production environments. Deployments on VPS and AWS (Elastic Beanstalk, Code Pipeline, EC2).",

    // Skills
    "skills.title": "Skills",
    "skills.backend": "Backend",
    "skills.frontend": "Frontend",
    "skills.infra": "Infrastructure",
    "skills.data": "Data & BI",

    // Portfolio
    "portfolio.title": "Portfolio",
    "portfolio.vendinhasDesc": "Complete solution for sales and inventory management aimed at freelancers and small businesses. Simplifies billing and daily organization, allowing full control of commercial operations.",
    "portfolio.viewProject": "View project",

    // Contact
    "contact.title": "Contact",
    "contact.intro": "I'm looking for connections to innovate in technology and data analysis projects. If you need custom solutions in",
    "contact.backend": "backend",
    "contact.fullstack": "fullstack",
    "contact.or": "or",
    "contact.bi": "BI",
    "contact.connect": "let's connect!",
    "contact.location": "Rio de Janeiro or Remote",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language;
    return saved || "pt";
  });

  const toggleLanguage = () => {
    const newLang = language === "pt" ? "en" : "pt";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
