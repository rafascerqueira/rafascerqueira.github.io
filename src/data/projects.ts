export type ProjectLanguage = "pt" | "en";

export type ProjectCopy = {
  title: string;
  category: string;
  summary: string;
  context: string;
  features: readonly string[];
};

export type Project = {
  slug: string;
  owner: "Rafael Cerqueira";
  cover: "vendinhas" | "mgcred-bi" | "mgcred-fechamento";
  technologies: readonly string[];
  deployment?: string;
  externalUrl?: string;
  restricted?: boolean;
  featured?: boolean;
  preview?: {
    src: string;
    width: number;
    height: number;
    copy: Record<ProjectLanguage, { alt: string; caption: string }>;
  };
  copy: Record<ProjectLanguage, ProjectCopy>;
};

export const projects: readonly Project[] = [
  {
    slug: "vendinhas-app",
    owner: "Rafael Cerqueira",
    cover: "vendinhas",
    featured: true,
    technologies: ["Node.js", "TypeScript", "React", "NestJS", "PostgreSQL"],
    copy: {
      pt: {
        title: "Vendinhas App",
        category: "Produto digital · Fullstack",
        summary: "Gestão de vendas e estoques para autônomos e pequenos negócios.",
        context: "Criei o Vendinhas App para reunir a gestão de vendas e estoques em uma solução voltada à rotina de autônomos e pequenos negócios.",
        features: ["Gestão de vendas", "Controle de estoques", "Foco em autônomos e pequenos negócios"],
      },
      en: {
        title: "Vendinhas App",
        category: "Digital product · Fullstack",
        summary: "Sales and inventory management for freelancers and small businesses.",
        context: "I created Vendinhas App to bring sales and inventory management together in a solution for the everyday needs of freelancers and small businesses.",
        features: ["Sales management", "Inventory management", "Designed for freelancers and small businesses"],
      },
    },
  },
  {
    slug: "bi-mgcred",
    owner: "Rafael Cerqueira",
    cover: "mgcred-bi",
    technologies: ["Streamlit"],
    deployment: "Streamlit",
    externalUrl: "https://bi-mgcred.streamlit.app/",
    preview: {
      src: "/bi-dashboard-demo.svg",
      width: 1280,
      height: 640,
      copy: {
        pt: {
          alt: "Dashboard comercial demonstrativo com dados fictícios: pagamentos, metas, análises, cancelamentos e médias por consultor e loja.",
          caption: "Demonstração — dados fictícios e marca genérica. Interface recriada a partir do projeto.",
        },
        en: {
          alt: "Demonstration sales dashboard with fictional data: payments, targets, pending reviews, cancellations and averages per consultant and store.",
          caption: "Demonstration — fictional data and generic branding. Interface recreated from the project.",
        },
      },
    },
    copy: {
      pt: {
        title: "BI MG Cred",
        category: "Dados · Business intelligence",
        summary: "Dashboard de vendas e indicadores comerciais, com acompanhamento de metas, pagamentos e desempenho por período.",
        context: "Desenvolvi este projeto de business intelligence para a MG Cred, disponibilizado no Streamlit. O painel reúne pagamentos, propostas em análise, cancelamentos, metas e médias por consultor e loja. A imagem demonstrativa usa somente valores fictícios e identidade visual genérica.",
        features: ["Acompanhamento de pagamentos, análises e cancelamentos", "Metas, projeções e médias por consultor e loja", "Seleção de período por mês e ano"],
      },
      en: {
        title: "BI MG Cred",
        category: "Data · Business intelligence",
        summary: "Sales and business performance dashboard, tracking targets, payments and results by reporting period.",
        context: "I developed this business intelligence project for MG Cred, hosted on Streamlit. The dashboard brings together payments, proposals under review, cancellations, targets and averages per consultant and store. The demonstration image uses only fictional values and generic branding.",
        features: ["Tracking payments, pending reviews and cancellations", "Targets, projections and averages per consultant and store", "Reporting period selection by month and year"],
      },
    },
  },
  {
    slug: "caderno-mgcred",
    owner: "Rafael Cerqueira",
    cover: "mgcred-fechamento",
    technologies: [],
    deployment: "Vercel",
    externalUrl: "https://mgcred-fechamento.vercel.app/login",
    restricted: true,
    preview: {
      src: "/caderno-dashboard-demo.svg",
      width: 1440,
      height: 960,
      copy: {
        pt: {
          alt: "Caderno de fechamento demonstrativo com dados fictícios: evolução de pontos e metas de quatro regiões comerciais, com indicadores de atingimento e variação de ritmo.",
          caption: "Demonstração — dados fictícios e marca genérica. Interface recriada a partir do projeto.",
        },
        en: {
          alt: "Demonstration sales closing report with fictional data: points and targets across four sales regions, with attainment and performance change indicators.",
          caption: "Demonstration — fictional data and generic branding. Interface recreated from the project.",
        },
      },
    },
    copy: {
      pt: {
        title: "Caderno MG Cred",
        category: "Aplicação web · Fechamento comercial",
        summary: "Produção, metas, produtividade e MIX reunidos em uma visão confiável de cada competência.",
        context: "Aplicação de fechamento comercial da MG Cred, com acesso restrito por login. Reúne produção, metas, produtividade e MIX por competência. A imagem demonstrativa recria a visão de evolução regional, com comparação de pontos e metas na mesma escala, usando somente regiões e valores fictícios e identidade visual genérica.",
        features: ["Fechamento comercial", "Produção, metas, produtividade e MIX por competência", "Acesso restrito por login"],
      },
      en: {
        title: "Caderno MG Cred",
        category: "Web application · Sales closing",
        summary: "Production, targets, productivity and product mix brought together in a reliable view of each reporting period.",
        context: "MG Cred's sales closing application, with access restricted by login. It brings production, targets, productivity and product mix together for each reporting period. The demonstration image recreates the regional performance view, comparing points and targets on the same scale, using only fictional regions and values with generic branding.",
        features: ["Sales closing", "Production, targets, productivity and product mix by reporting period", "Login-restricted access"],
      },
    },
  },
];

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
