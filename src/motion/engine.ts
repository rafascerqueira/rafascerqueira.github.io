import type Lenis from "lenis";

type Engine = { gsap: typeof import("gsap").gsap; ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger; lenis: Lenis | null };

let loading: Promise<Engine> | undefined;
export let lenis: Lenis | null = null;

// GSAP and Lenis are loaded after first paint so the hero never waits on them.
export function loadEngine() {
  loading ??= (async () => {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
    gsap.registerPlugin(ScrollTrigger);
    // Smooth scroll only for mouse/trackpad users who haven't asked for less motion.
    // Touch keeps native scrolling, and so does anyone with reduced motion.
    if (matchMedia("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)").matches) {
      const { default: LenisScroll } = await import("lenis");
      lenis = new LenisScroll({ autoRaf: false, lerp: 0.1, wheelMultiplier: 0.9 });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis?.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    return { gsap, ScrollTrigger, lenis };
  })();
  return loading;
}
