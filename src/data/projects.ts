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
  repositories?: readonly { label: string; url: string }[];
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
    technologies: ["Node.js", "TypeScript", "NestJS", "Fastify", "Prisma", "Next.js", "React", "PostgreSQL", "Redis", "Docker"],
    deployment: "VPS (Nginx + PM2)",
    repositories: [
      { label: "Backend (GitHub)", url: "https://github.com/rafascerqueira/v-backend" },
      { label: "Frontend (GitHub)", url: "https://github.com/rafascerqueira/v-frontend" },
    ],
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
        context: "Criei o Vendinhas para reunir, em um só lugar, a rotina de vendas de autônomos e pequenos negócios. Cada vendedor tem seus próprios dados isolados e acompanha pedidos, clientes, produtos, estoque e cobranças a partir de um painel de indicadores. Também monta kits, cria promoções e compartilha um catálogo público para os clientes fazerem pedidos. Projeto pessoal e open source, em desenvolvimento ativo; a operação pública está pausada e deve voltar em 2027. No código, a API em NestJS, Fastify e Prisma usa PostgreSQL e Redis, com autenticação JWT (RS256) com refresh token e blacklist no Redis, cookies HttpOnly e senhas com Argon2; os dados são multi-tenant, e a API tem documentação Swagger e health checks. O front-end em Next.js é um PWA instalável, com tema claro e escuro e notificações em tempo real via Socket.IO. A imagem é ilustrativa e usa somente dados fictícios.",
        features: ["Painel com receita, pedidos, clientes e produtos", "Pedidos com acompanhamento de status e cobranças geradas a partir deles", "Controle de estoque com movimentações e alertas de estoque baixo", "Kits, promoções e preços por período", "Catálogo público compartilhável, com carrinho e checkout para os clientes", "PWA instalável, com tema claro e escuro e notificações em tempo real", "Planos de assinatura e painel administrativo com logs de auditoria"],
      },
      en: {
        title: "Vendinhas App",
        category: "Digital product · Full-stack SaaS",
        summary: "A SaaS platform that helps freelancers and small businesses manage sales, stock, customers and billing, with a public catalog for taking orders.",
        context: "I created Vendinhas to bring the day-to-day sales routine of freelancers and small businesses into one place. Each seller has their own isolated data and follows orders, customers, products, stock and billing from a metrics dashboard. They can also build bundles, run promotions and share a public catalog where customers place orders. A personal open source project under active development; public operation is paused and is expected to return in 2027. Under the hood, the NestJS, Fastify and Prisma API uses PostgreSQL and Redis, with JWT (RS256) authentication, refresh tokens and a Redis blacklist, HttpOnly cookies and Argon2-hashed passwords; data is multi-tenant, and the API ships Swagger docs and health checks. The Next.js front end is an installable PWA with light and dark themes and real-time notifications via Socket.IO. The image is illustrative and uses only fictional data.",
        features: ["Dashboard with revenue, orders, customers and products", "Orders with status tracking and billing generated from them", "Stock control with movements and low-stock alerts", "Bundles, promotions and time-based pricing", "Shareable public catalog with cart and checkout for customers", "Installable PWA with light and dark themes and real-time notifications", "Subscription plans and an admin panel with audit logs"],
      },
    },
  },
  {
    slug: "bi-mgcred",
    owner: "Rafael Cerqueira",
    company: "MG Cred",
    cover: "mgcred-bi",
    technologies: ["Python", "Streamlit", "SQL", "PostgreSQL", "Supabase"],
    deployment: "Streamlit Community Cloud",
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
        context: "Desenvolvi sozinho este projeto de business intelligence para a MG Cred, entre meados de março e o fim de abril de 2026. Ele trocou o armazenamento em planilhas por um banco PostgreSQL no Supabase e passou a ser consumido por perfil de acesso, de cada loja até a diretoria, sem licença de BI por usuário. A atualização completa, que levava de 40 minutos a 1 hora, agora acontece por um aplicativo de importação; a consulta, que levava cerca de 12 minutos, passou para menos de 2. O painel reúne pagamentos, propostas em análise, cancelamentos, metas e médias por consultor e loja. A imagem demonstrativa usa somente valores fictícios e identidade visual genérica.",
        features: ["Acompanhamento de pagamentos, análises e cancelamentos", "Metas, projeções e médias por consultor e loja", "Login com perfis de acesso: lojas, gerências e visão geral da diretoria", "Atualização dos dados por aplicativo de importação", "Seleção de período por mês e ano"],
      },
      en: {
        title: "Sales Dashboard",
        category: "Data · Business intelligence",
        summary: "Sales and business performance dashboard, tracking targets, payments and results by reporting period.",
        context: "I developed this business intelligence project for MG Cred on my own, between mid-March and the end of April 2026. It replaced spreadsheet storage with a PostgreSQL database on Supabase and is consumed through access profiles, from each store up to executive management, without a BI license per user. The full data refresh, which used to take 40 minutes to 1 hour, now runs through an import app; queries went from about 12 minutes to under 2. The dashboard brings together payments, proposals under review, cancellations, targets and averages per consultant and store. The demonstration image uses only fictional values and generic branding.",
        features: ["Tracking payments, pending reviews and cancellations", "Targets, projections and averages per consultant and store", "Login with access profiles: stores, managers and an executive overview", "Data refresh through an import app", "Reporting period selection by month and year"],
      },
    },
  },
  {
    slug: "caderno-mgcred",
    owner: "Rafael Cerqueira",
    company: "MG Cred",
    cover: "mgcred-fechamento",
    technologies: ["Next.js", "React", "TypeScript", "CSS Modules", "Supabase"],
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
        context: "Aplicação de fechamento comercial da MG Cred, com acesso restrito por login. Reúne produção, metas, produtividade e MIX por competência. O fechamento, que tomava o expediente inteiro, agora leva alguns minutos: a aplicação lê os dados completos, incluindo os meses anteriores, assim que a última produção do dia útil anterior chega ao banco. Feito com Next.js (App Router), React e TypeScript, com testes de domínio no Node test runner. A imagem demonstrativa recria a visão de evolução regional, com comparação de pontos e metas na mesma escala, usando somente regiões e valores fictícios e identidade visual genérica.",
        features: ["Fechamento comercial", "Produção, metas, produtividade e MIX por competência", "Leitura automática dos meses anteriores", "Acesso restrito por login"],
      },
      en: {
        title: "Production Closing",
        category: "Web application · Sales closing",
        summary: "Production, targets, productivity and product mix brought together in a reliable view of each reporting period.",
        context: "MG Cred's sales closing application, with access restricted by login. It brings production, targets, productivity and product mix together for each reporting period. The closing, which used to take a whole workday, now takes a few minutes: the app reads the full data, including previous months, as soon as the last production figures of the previous business day reach the database. Built with Next.js (App Router), React and TypeScript, with domain tests on the Node test runner. The demonstration image recreates the regional performance view, comparing points and targets on the same scale, using only fictional regions and values with generic branding.",
        features: ["Sales closing", "Production, targets, productivity and product mix by reporting period", "Automatic reading of previous months", "Login-restricted access"],
      },
    },
  },
];

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
