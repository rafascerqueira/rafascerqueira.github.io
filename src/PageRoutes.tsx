import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("pages/Home.tsx", { id: "home-pt" }),
  route("en", "pages/Home.tsx", { id: "home-en" }),
  route("projetos/:slug", "pages/Project.tsx", { id: "project-pt" }),
  route("en/projetos/:slug", "pages/Project.tsx", { id: "project-en" }),
  ...["portfolio", "service", "skills", "contact"].map((path) =>
    route(path, "pages/Legacy.tsx", { id: `legacy-${path}` }),
  ),
  route("404", "pages/NotFound.tsx", { id: "not-found" }),
  route("*", "pages/NotFound.tsx", { id: "catch-all" }),
] satisfies RouteConfig;
