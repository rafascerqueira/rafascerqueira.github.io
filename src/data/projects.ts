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
  company?: string;
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
    technologies: ["Node.js", "TypeScript", "NestJS", "Next.js", "PostgreSQL", "Redis"],
    deployment: "VPS (Nginx + PM2)",
    preview: {
      src: "/vendinhas-dashboard-demo.svg",
      width: 1280,
      height: 800,
      copy: {
        pt: {
          alt: "Ilustração do Vendinhas com dados fictícios: painel de gestão com receita, pedidos, clientes e produtos, o catálogo público de uma loja no celular e um alerta de estoque baixo.",
          caption: "Interface ilustrativa — dados fictícios. Painel de gestão e catálogo público.",
        },
        en: {
          alt: "Illustration of Vendinhas with fictional data: a management dashboard with revenue, orders, customers and products, a shop's public catalog on a phone, and a low-stock alert.",
          caption: "Illustrative interface — fictional data. Management dashboard and public catalog.",
        },
      },
    },
    copy: {
      pt: {
        title: "Vendinhas App",
        category: "Produto digital · SaaS fullstack",
        summary: "Plataforma SaaS para autônomos e pequenos negócios organizarem vendas, estoque, clientes e cobranças, com catálogo público para receber pedidos.",
        context: "Criei o Vendinhas para reunir, em um só lugar, a rotina de vendas de autônomos e pequenos negócios. Cada vendedor tem seus próprios dados isolados e acompanha pedidos, clientes, produtos, estoque e cobranças a partir de um painel de indicadores. Também monta kits, cria promoções e compartilha um catálogo público para os clientes fazerem pedidos. No código, a API em NestJS e Fastify usa PostgreSQL e Redis, com autenticação JWT e senhas protegidas com Argon2; o front-end em Next.js é um PWA instalável, com tema claro e escuro e notificações em tempo real. A imagem é ilustrativa e usa somente dados fictícios.",
        features: ["Painel com receita, pedidos, clientes e produtos", "Pedidos com acompanhamento de status e cobranças geradas a partir deles", "Controle de estoque com movimentações e alertas de estoque baixo", "Kits, promoções e preços por período", "Catálogo público compartilhável, com carrinho e checkout para os clientes", "PWA instalável, com tema claro e escuro e notificações em tempo real", "Planos de assinatura e painel administrativo com logs de auditoria"],
      },
      en: {
        title: "Vendinhas App",
        category: "Digital product · Full-stack SaaS",
        summary: "A SaaS platform that helps freelancers and small businesses manage sales, stock, customers and billing, with a public catalog for taking orders.",
        context: "I created Vendinhas to bring the day-to-day sales routine of freelancers and small businesses into one place. Each seller has their own isolated data and follows orders, customers, products, stock and billing from a metrics dashboard. They can also build bundles, run promotions and share a public catalog where customers place orders. Under the hood, the NestJS and Fastify API uses PostgreSQL and Redis, with JWT authentication and Argon2-hashed passwords; the Next.js front end is an installable PWA with light and dark themes and real-time notifications. The image is illustrative and uses only fictional data.",
        features: ["Dashboard with revenue, orders, customers and products", "Orders with status tracking and billing generated from them", "Stock control with movements and low-stock alerts", "Bundles, promotions and time-based pricing", "Shareable public catalog with cart and checkout for customers", "Installable PWA with light and dark themes and real-time notifications", "Subscription plans and an admin panel with audit logs"],
      },
    },
  },
  {
    slug: "bi-mgcred",
    owner: "Rafael Cerqueira",
    company: "MG Cred",
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
        title: "Painel de Vendas",
        category: "Dados · Business intelligence",
        summary: "Dashboard de vendas e indicadores comerciais, com acompanhamento de metas, pagamentos e desempenho por período.",
        context: "Desenvolvi este projeto de business intelligence para a MG Cred, disponibilizado no Streamlit. O painel reúne pagamentos, propostas em análise, cancelamentos, metas e médias por consultor e loja. A imagem demonstrativa usa somente valores fictícios e identidade visual genérica.",
        features: ["Acompanhamento de pagamentos, análises e cancelamentos", "Metas, projeções e médias por consultor e loja", "Seleção de período por mês e ano"],
      },
      en: {
        title: "Sales Dashboard",
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
    company: "MG Cred",
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
        title: "Fechamento de Produção",
        category: "Aplicação web · Fechamento comercial",
        summary: "Produção, metas, produtividade e MIX reunidos em uma visão confiável de cada competência.",
        context: "Aplicação de fechamento comercial da MG Cred, com acesso restrito por login. Reúne produção, metas, produtividade e MIX por competência. A imagem demonstrativa recria a visão de evolução regional, com comparação de pontos e metas na mesma escala, usando somente regiões e valores fictícios e identidade visual genérica.",
        features: ["Fechamento comercial", "Produção, metas, produtividade e MIX por competência", "Acesso restrito por login"],
      },
      en: {
        title: "Production Closing",
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
