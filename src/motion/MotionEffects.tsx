import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { lenis, loadEngine } from "./engine";

const motion = "(prefers-reduced-motion: no-preference)";
const fine = "(hover: hover) and (pointer: fine)";
const stackable = "(min-width: 761px) and (min-height: 641px)";

export default function MotionEffects() {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Same-page anchors glide with Lenis; the URL is committed once the glide ends.
  // Without Lenis (touch, reduced motion) links keep their native behaviour.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.classList.contains("skip-link") || link.target) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      const root = getComputedStyle(document.documentElement);
      // An explicit pixel target (not the element): it lands exactly where the native hash jump would,
      // so the router's own scroll after navigate() is a no-op instead of a visible correction.
      const inset = (parseFloat(root.scrollPaddingTop) || 0) + (parseFloat(getComputedStyle(target).scrollMarginTop) || 0);
      const top = Math.round(target.getBoundingClientRect().top + window.scrollY - inset);
      lenis.scrollTo(top, { duration: 1.3, onComplete: () => void navigate(`${url.pathname}${url.search}${url.hash}`) });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  useEffect(() => {
    let stale = false;
    let dispose: (() => void) | undefined;
    void loadEngine().then(({ gsap, ScrollTrigger }) => {
      if (stale) return;
      const q = <T extends HTMLElement>(selector: string) => document.querySelector<T>(selector);
      const qa = <T extends HTMLElement>(selector: string) => gsap.utils.toArray<T>(selector);
      const mm = gsap.matchMedia();

      mm.add({ motion, fine, stackable }, (context) => {
        const conditions = context.conditions as Record<"motion" | "fine" | "stackable", boolean>;
        if (!conditions.motion) return;
        const cleanups: Array<() => void> = [];
        const listen = <K extends keyof HTMLElementEventMap>(element: HTMLElement | null, type: K, handler: (event: HTMLElementEventMap[K]) => void) => {
          if (!element) return;
          element.addEventListener(type, handler);
          cleanups.push(() => element.removeEventListener(type, handler));
        };

        // Header: scroll progress hairline, tucks away on the way down, returns on the way up.
        const header = q(".site-header");
        const bar = q(".scroll-progress");
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            if (bar) bar.style.transform = `scaleX(${self.progress})`;
            header?.classList.toggle("is-hidden", self.direction === 1 && self.scroll() > 600);
          },
        });
        cleanups.push(() => { header?.classList.remove("is-hidden"); if (bar) bar.style.transform = ""; });

        // Beat 1 — hero: the visual drifts slower than the copy, so it recedes as you leave.
        const hero = q(".hero");
        if (hero) {
          gsap.to(".hero-visual", { yPercent: -14, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
          gsap.to(".hero-copy", { yPercent: 8, opacity: 0.35, ease: "none", scrollTrigger: { trigger: hero, start: "35% top", end: "bottom top", scrub: true } });
        }
        if (conditions.fine && hero) {
          const visual = q(".hero-visual");
          if (visual) {
            const moveX = gsap.quickTo(visual, "--mx", { duration: 1, ease: "power3" });
            const moveY = gsap.quickTo(visual, "--my", { duration: 1, ease: "power3" });
            listen(hero, "pointermove", (event) => {
              const box = hero.getBoundingClientRect();
              moveX((event.clientX - box.left) / box.width - 0.5);
              moveY((event.clientY - box.top) / box.height - 0.5);
            });
            listen(hero, "pointerleave", () => { moveX(0); moveY(0); });
            cleanups.push(() => gsap.set(visual, { clearProps: "--mx,--my" }));
          }
        }

        // Beat 2 — stack ticker: speed and direction follow the scroll.
        const ticker = q(".marquee");
        const track = q(".marquee-track");
        if (ticker && track) {
          ticker.classList.add("is-live");
          const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: 42, repeat: -1 });
          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              const direction = self.direction;
              gsap.timeline({ defaults: { ease: "none" }, overwrite: true })
                .to(loop, { timeScale: direction * (1 + Math.min(Math.abs(self.getVelocity()) / 260, 7)), duration: 0.25 })
                .to(loop, { timeScale: 1, duration: 1.4 }, "+=0.1");
            },
          });
          cleanups.push(() => { ticker.classList.remove("is-live"); gsap.set(track, { clearProps: "transform" }); });
        }

        // Beat 3 — projects: each card is a layer; the one underneath sinks and dims as the next covers it.
        const cards = qa(".project-card");
        if (conditions.stackable) {
          cards.forEach((card, index) => {
            const next = cards[index + 1];
            if (!next) return;
            gsap.fromTo(card, { scale: 1, "--dim": 0 }, {
              scale: 0.93,
              "--dim": 0.5,
              ease: "none",
              transformOrigin: "50% 0%",
              scrollTrigger: { trigger: next, start: "top bottom", end: () => `top ${parseFloat(getComputedStyle(next).top) || 0}px`, scrub: true, invalidateOnRefresh: true },
            });
          });
        }
        if (conditions.fine) {
          for (const card of cards) {
            listen(card, "pointermove", (event) => {
              const box = card.getBoundingClientRect();
              card.style.setProperty("--sx", `${event.clientX - box.left}px`);
              card.style.setProperty("--sy", `${event.clientY - box.top}px`);
            });
          }
        }

        // Beat 4 — about: the statement is read out loud, word by word, at the reader's own pace.
        const words = qa(".about-statement .scrub-word");
        if (words.length) {
          gsap.fromTo(words, { "--w": 0 }, {
            "--w": 1,
            ease: "none",
            duration: 1,
            stagger: 0.45,
            scrollTrigger: { trigger: ".about-statement", start: "top 78%", end: "bottom 42%", scrub: 0.6 },
          });
        }

        // Magnetic buttons.
        if (conditions.fine) {
          for (const element of qa("[data-magnetic]")) {
            const moveX = gsap.quickTo(element, "--tx", { duration: 0.7, ease: "elastic.out(1, 0.55)" });
            const moveY = gsap.quickTo(element, "--ty", { duration: 0.7, ease: "elastic.out(1, 0.55)" });
            listen(element, "pointermove", (event) => {
              const box = element.getBoundingClientRect();
              moveX((event.clientX - (box.left + box.width / 2)) * 0.28);
              moveY((event.clientY - (box.top + box.height / 2)) * 0.36);
            });
            listen(element, "pointerleave", () => { moveX(0); moveY(0); });
            cleanups.push(() => gsap.set(element, { clearProps: "--tx,--ty" }));
          }
        }

        return () => cleanups.forEach((cleanup) => cleanup());
      });

      dispose = () => mm.revert();
      void document.fonts?.ready.then(() => { if (!stale) ScrollTrigger.refresh(); });
    });
    return () => { stale = true; dispose?.(); };
  }, [pathname, language]);

  return null;
}
