import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";

const legacySections: Record<string, string> = { "/": "inicio", "/portfolio": "projetos", "/service": "atuacao", "/skills": "sobre", "/contact": "contato" };

export default function NavigationEffects() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (hash.startsWith("#/")) {
      const section = legacySections[hash.slice(1).replace(/\/$/, "") || "/"];
      if (section) void navigate(`/#${section}`, { replace: true });
      return;
    }
    const changed = previousPath.current !== pathname;
    previousPath.current = pathname;
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : changed ? document.querySelector<HTMLElement>("main h1") : null;
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, navigate]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove("reveal-pending");
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    for (const element of elements) {
      if (element.getBoundingClientRect().top < window.innerHeight) continue;
      element.classList.add("reveal-pending");
      observer.observe(element);
    }
    return () => {
      observer.disconnect();
      for (const element of elements) element.classList.remove("reveal-pending");
    };
  }, [pathname]);

  return null;
}
