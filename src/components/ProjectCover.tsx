import { useLanguage } from "../context/LanguageContext";
import type { Project } from "../data/projects";

type ProjectCoverProps = {
  project: Project;
  sharedTransition?: boolean;
  eager?: boolean;
  compact?: boolean;
};

export function ProjectCover({ project, sharedTransition = true, eager = false, compact = false }: ProjectCoverProps) {
  const { language } = useLanguage();
  const preview = project.preview;
  const content = preview?.copy[language];
  const cover = (
    <div
      className={`project-cover project-cover-${project.cover}`}
      aria-hidden={preview && !compact ? undefined : true}
      style={{
        aspectRatio: preview && eager ? "auto" : "16 / 10",
        viewTransitionName: sharedTransition ? `project-${project.slug}` : undefined,
      }}
    >
      {preview ? (
        <img className="project-demo-image" src={preview.src} width={preview.width} height={preview.height} alt={compact ? "" : content?.alt} loading={eager ? "eager" : "lazy"} decoding="async" />
      ) : (
        <>
          <span className="project-cover-grid" />
          <span className="project-cover-orbit" />
          <span className="project-cover-label">PRODUÇÃO</span>
          <span className="project-cover-type">Fechamento<span className="project-cover-type-accent">/ Produção</span></span>
          <span className="project-cover-mark">FP</span>
        </>
      )}
    </div>
  );

  return preview && !compact ? (
    <figure className="project-preview">
      {cover}
      <figcaption className="project-preview-caption">
        <span>{content?.caption}</span>
        {eager && <a className="text-link" href={preview.src} target="_blank" rel="noopener noreferrer">{language === "en" ? "Open full-size image" : "Ampliar demonstração"}</a>}
      </figcaption>
    </figure>
  ) : cover;
}

export default ProjectCover;
