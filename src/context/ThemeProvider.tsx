import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

const event = "portfolio-theme";
let memoryPreference: Theme | null = null;

function getTheme(): Theme {
  let saved = memoryPreference;
  try {
    const value = localStorage.getItem("theme");
    if (!saved && (value === "light" || value === "dark")) saved = value;
  } catch {
    saved = memoryPreference;
  }
  return saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onStorage = () => { memoryPreference = null; callback(); };
  window.addEventListener(event, callback);
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", callback);
  return () => {
    window.removeEventListener(event, callback);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", callback);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  useEffect(() => {
    const current = getTheme();
    document.documentElement.dataset.theme = current;
    document.documentElement.style.colorScheme = current;
  }, [theme]);

  const toggleTheme = () => {
    memoryPreference = getTheme() === "light" ? "dark" : "light";
    try { localStorage.setItem("theme", memoryPreference); }
    catch { document.documentElement.dataset.theme = memoryPreference; }
    window.dispatchEvent(new Event(event));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
