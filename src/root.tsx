import type { ReactNode } from "react";
import { Links, Meta, ScrollRestoration, Scripts, useLocation } from "react-router";
import App from "./App";
import { getProject } from "./data/projects";
import NotFound from "./pages/NotFound";
import interFont from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
import "./index.scss";

const origin = "https://rafascerqueira.github.io";
const initializeTheme = `(function(){var t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t})()`;

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const english = /^\/en(?:\/|$)/.test(pathname);
  const language = english ? "en" : "pt";
  const path = pathname.replace(/^\/en(?=\/|$)/, "").replace(/\/$/, "") || "/";
  const project = path.startsWith("/projetos/") ? getProject(path.split("/")[2]) : undefined;
  const copy = project?.copy[language];
  const isContent = path === "/" || Boolean(project);
  const canonicalPath = isContent ? `${english ? "/en" : ""}${path === "/" ? "/" : `${path}/`}` : "/";
  const title = copy ? `${copy.title} — Rafael Cerqueira` : "Rafael Cerqueira — Software Engineer";
  const description = copy?.summary ?? (english ? "Backend, digital products and business intelligence. Explore projects by Rafael Cerqueira, software engineer in Rio de Janeiro." : "Backend, produtos digitais e business intelligence. Conheça os projetos de Rafael Cerqueira, engenheiro de software no Rio de Janeiro.");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": project ? "CreativeWork" : "ProfilePage",
    name: copy?.title ?? "Rafael Cerqueira",
    description,
    url: `${origin}${canonicalPath}`,
    ...(project ? { author: { "@type": "Person", name: "Rafael Cerqueira", url: origin } } : { mainEntity: { "@type": "Person", name: "Rafael Cerqueira", jobTitle: "Software Engineer", url: origin, sameAs: ["https://github.com/rafascerqueira", "https://www.linkedin.com/in/rafascerqueira/"] } }),
  };

  return (
    <html lang={english ? "en" : "pt-BR"} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: initializeTheme }} />
        <title>{isContent ? title : english ? "Page not found — Rafael Cerqueira" : "Rafael Cerqueira — Navegação"}</title>
        <meta name="description" content={description} />
        {!isContent && <meta name="robots" content="noindex, follow" />}
        <link rel="canonical" href={`${origin}${canonicalPath}`} />
        {isContent && <><link rel="alternate" hrefLang="pt-BR" href={`${origin}${path === "/" ? "/" : `${path}/`}`} /><link rel="alternate" hrefLang="en" href={`${origin}/en${path === "/" ? "/" : `${path}/`}`} /><link rel="alternate" hrefLang="x-default" href={`${origin}${path === "/" ? "/" : `${path}/`}`} /></>}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${origin}${canonicalPath}`} />
        <meta property="og:locale" content={english ? "en_US" : "pt_BR"} />
        <meta property="og:image" content={`${origin}/social-card.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Rafael Cerqueira — Software Engineer" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="preload" href={interFont} as="font" type="font/woff2" crossOrigin="anonymous" />
        <Meta /><Links />
        {isContent && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />}
      </head>
      <body>{path === "/404" ? <main id="main-content"><NotFound /></main> : <>{children}<ScrollRestoration /><Scripts /></>}</body>
    </html>
  );
}

export default App;

export function ErrorBoundary() {
  return <main id="main-content"><NotFound /></main>;
}
