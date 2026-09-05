import type { Config } from "@react-router/dev/config";
import { projects } from "./src/data/projects";

export default {
  appDirectory: "src",
  buildDirectory: "build",
  ssr: false,
  prerender: [
    "/", "/en/",
    ...projects.flatMap(({ slug }) => [
      `/projetos/${slug}/`, `/en/projetos/${slug}/`,
    ]),
    "/portfolio/", "/service/", "/skills/", "/contact/", "/404/",
  ],
} satisfies Config;
