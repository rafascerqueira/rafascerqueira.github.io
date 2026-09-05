import AxeBuilder from "@axe-core/playwright";
import { expect, test as base, type Page } from "@playwright/test";

const projects = [
  { slug: "vendinhas-app", title: "Vendinhas App" },
  { slug: "bi-mgcred", title: "BI MG Cred", external: "https://bi-mgcred.streamlit.app/" },
  { slug: "caderno-mgcred", title: "Caderno MG Cred", external: "https://mgcred-fechamento.vercel.app/login" },
] as const;

const test = base.extend<{ runtimeErrors: void }>({
  runtimeErrors: [async ({ page }, use) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      const expectedNotFound = message.location().url.includes("missing-portfolio-route") && /404/.test(message.text());
      if (message.type() === "error" && !expectedNotFound) errors.push(message.text());
    });
    await use();
    expect(errors, "Unexpected browser or hydration errors").toEqual([]);
  }, { auto: true }],
});

async function revealContent(page: Page) {
  for (const element of await page.locator("[data-reveal]").all()) {
    await element.scrollIntoViewIfNeeded();
    await expect(element).toHaveCSS("opacity", "1");
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
}

async function audit(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
}

test("home shows exactly three project cards and confirmed external destinations", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Código com propósito.");
  const cards = page.locator("#projetos article");
  await expect(cards).toHaveCount(3);
  for (const project of projects) {
    const card = cards.filter({ has: page.getByRole("heading", { name: project.title, exact: true }) });
    await expect(card).toHaveCount(1);
    await expect(card.getByRole("link", { name: `Explorar projeto: ${project.title}`, exact: true }))
      .toHaveAttribute("href", `/projetos/${project.slug}/`);
    if ("external" in project) {
      const external = card.locator(`a[href="${project.external}"]`);
      await expect(external).toHaveCount(1);
      await expect(external).toHaveAttribute("target", "_blank");
      await expect(external).toHaveAttribute("rel", /\bnoopener\b/);
      await expect(external).toHaveAttribute("rel", /\bnoreferrer\b/);
    } else {
      await expect(card.locator('a[href^="https://"]')).toHaveCount(0);
      await expect(card.getByRole("link", { name: "Conversar sobre o projeto" })).toHaveAttribute("href", "/#contato");
    }
  }
  await expect(cards.filter({ hasText: "Caderno MG Cred" })).toContainText("Acesso restrito");
  await page.getByRole("link", { name: "Explorar projetos", exact: true }).click();
  await expect.poll(() => page.locator("#projetos").evaluate((element) => element.getBoundingClientRect().top)).toBeLessThan(150);
  await expect(page.locator("#projetos")).toBeFocused();
  await cards.first().getByRole("link", { name: "Explorar projeto: Vendinhas App", exact: true }).click();
  await expect(page).toHaveURL(/\/projetos\/vendinhas-app\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Vendinhas App");
});

for (const demo of [
  { slug: "bi-mgcred", title: "BI MG Cred", asset: "/bi-dashboard-demo.svg", brand: "BI Demo", example: "Usuário de exemplo", width: 1280 },
  { slug: "caderno-mgcred", title: "Caderno MG Cred", asset: "/caderno-dashboard-demo.svg", brand: "Caderno Demo", example: "AURORA", width: 1440 },
]) {
test(`${demo.title} preview contains only a labeled fictional dashboard and is available in both languages`, async ({ page, request }) => {
  const asset = await request.get(demo.asset);
  expect(asset.status()).toBe(200);
  expect(asset.headers()["content-type"]).toContain("image/svg+xml");
  const svg = await asset.text();
  expect(svg).toContain(demo.brand);
  expect(svg).toContain("dados fictícios");
  expect(svg).toContain(demo.example);
  expect(svg).not.toMatch(/MG\s?Cred|Rafael|Sandra|Robson|Jacqueline|Glenda|<image\b|<script\b|<foreignObject\b|data:image/i);

  for (const prefix of ["", "/en"]) {
    const notice = prefix ? "Demonstration — fictional data and generic branding." : "Demonstração — dados fictícios e marca genérica.";
    await page.goto(`${prefix}/`);
    const card = page.locator("#projetos article").filter({ has: page.getByRole("heading", { name: demo.title, exact: true }) });
    await card.scrollIntoViewIfNeeded();
    await expect(card.locator("figcaption")).toContainText(notice);
    await expect(card.getByRole("img")).toHaveAttribute("src", demo.asset);
    await expect.poll(() => card.getByRole("img").evaluate((image: HTMLImageElement) => image.naturalWidth)).toBe(demo.width);
    await page.goto(`${prefix}/projetos/${demo.slug}/`);
    const preview = page.locator(".project-preview");
    await expect(preview.locator("figcaption")).toContainText(notice);
    await expect(preview.getByRole("img")).toHaveAttribute("alt", prefix ? /fictional data/ : /dados fictícios/);
    const croppedPixels = await preview.getByRole("img").evaluate((image) => {
      const bounds = image.getBoundingClientRect();
      const frame = image.parentElement!.getBoundingClientRect();
      return Math.max(frame.top - bounds.top, bounds.bottom - frame.bottom, frame.left - bounds.left, bounds.right - frame.right);
    });
    expect(croppedPixels, "The complete demonstration image must remain visible").toBeLessThanOrEqual(1);
    await expect(preview.getByRole("link")).toHaveAttribute("href", demo.asset);
    await expect(preview.getByRole("link")).toHaveAttribute("target", "_blank");
  }
});
}

for (const project of projects) {
  test(`project ${project.slug} supports direct entry and reload`, async ({ page }) => {
    const response = await page.goto(`/projetos/${project.slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
    await expect(page.getByRole("link", { name: "Voltar aos projetos", exact: true })).toHaveAttribute("href", "/#projetos");
    if ("external" in project) {
      await expect(page.locator(`.project-detail-actions a[href="${project.external}"]`)).toHaveAttribute("target", "_blank");
    }
    const reloaded = await page.reload();
    expect(reloaded?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
    await expect(page.getByRole("heading", { name: "Sobre o projeto", exact: true })).toBeVisible();
  });
}

test("English home and every English project load with the correct language", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Code with purpose.");
  await expect(page.locator("#projetos article")).toHaveCount(3);
  for (const project of projects) {
    const response = await page.goto(`/en/projetos/${project.slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
    await expect(page.getByRole("link", { name: "Back to projects", exact: true })).toHaveAttribute("href", "/en/#projetos");
    await page.reload();
    await expect(page.getByRole("heading", { name: "About the project", exact: true })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  }
});

test("language switching preserves the project, query and section hash", async ({ page }) => {
  await page.goto("/projetos/bi-mgcred/?source=portfolio#project-overview-title");
  await page.getByRole("button", { name: "Switch to English", exact: true }).click();
  await expect(page).toHaveURL("/en/projetos/bi-mgcred/?source=portfolio#project-overview-title");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("BI MG Cred");
  await page.getByRole("button", { name: "Mudar para português", exact: true }).click();
  await expect(page).toHaveURL("/projetos/bi-mgcred/?source=portfolio#project-overview-title");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await page.goto("/#projetos");
  await page.getByRole("button", { name: "Switch to English", exact: true }).click();
  await expect(page).toHaveURL("/en/#projetos");
});

test("explicit theme choice persists across reload and overrides the OS", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Ativar modo escuro", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Ativar modo claro", exact: true }).click();
  await page.emulateMedia({ colorScheme: "dark" });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("first load follows either OS scheme and ignores invalid stored themes", async ({ page }) => {
  for (const scheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", scheme);
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBeNull();
  }
  await page.evaluate(() => localStorage.setItem("theme", "not-a-theme"));
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Ativar modo claro", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("reduced motion disables reveal transforms and animated transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await revealContent(page);
  await expect(page.locator(".reveal-pending")).toHaveCount(0);
  const motion = await page.locator("[data-reveal], .button, .project-card, .theme-toggle").evaluateAll((elements) => elements.map((element) => {
    const style = getComputedStyle(element);
    return {
      transform: element.hasAttribute("data-reveal") ? style.transform : "none",
      transitions: style.transitionDuration.split(",").map((value) => parseFloat(value)),
      animations: style.animationDuration.split(",").map((value) => parseFloat(value)),
    };
  }));
  expect(motion.length).toBeGreaterThan(0);
  for (const element of motion) {
    expect(element.transform).toBe("none");
    expect(element.transitions.every((duration) => duration <= 0.00001)).toBe(true);
    expect(element.animations.every((duration) => duration <= 0.00001)).toBe(true);
  }
});

test("mobile dialog traps keyboard focus and Escape restores the menu trigger", async ({ page, isMobile }) => {
  test.skip(!isMobile, "The dialog is the mobile navigation");
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Abrir menu", exact: true });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Menu de navegação", exact: true });
  await expect(dialog).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(dialog.getByRole("button", { name: "Fechar menu", exact: true })).toBeFocused();
  const focusableCount = await dialog.locator("a[href], button").count();
  for (const key of ["Tab", "Shift+Tab"]) {
    for (let index = 0; index <= focusableCount; index += 1) {
      await page.keyboard.press(key);
      await expect.poll(() => dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    }
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Enter");
  await dialog.getByRole("link", { name: "Projetos", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL("/#projetos");
});

test("the first keyboard link skips navigation and focuses main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Pular para o conteúdo", exact: true });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await expect(page).toHaveURL("/#main-content");
});

test("home, project details and navigation do not overflow a narrow viewport", async ({ page }) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 320, height: 740 });
  for (const path of ["/", ...projects.map((project) => `/projetos/${project.slug}/`)]) {
    await page.goto(path);
    await revealContent(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  }
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

for (const theme of ["light", "dark"] as const) {
  test(`WCAG AA audit in ${theme} theme covers home, detail and mobile menu`, async ({ page, isMobile }) => {
    test.setTimeout(90_000);
    await page.emulateMedia({ colorScheme: theme });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    await revealContent(page);
    await audit(page);
    await page.goto("/projetos/caderno-mgcred/");
    await revealContent(page);
    await audit(page);
    if (isMobile) {
      await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      // Measure contrast after the opening fade reaches its final opacity.
      await dialog.evaluate(async (element) => {
        await Promise.all(element.getAnimations({ subtree: true }).map((animation) => animation.finished));
      });
      await expect(dialog).toHaveCSS("opacity", "1");
      await audit(page);
    }
  });
}

test("raw prerendered HTML contains home and project content with valid JavaScript assets", async ({ request, page }) => {
  for (const prefix of ["", "/en"]) {
    for (const project of [null, ...projects]) {
      const path = project ? `${prefix}/projetos/${project.slug}/` : `${prefix}/`;
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
      expect(response.headers()["content-type"]).toContain("text/html");
      const html = await response.text();
      const document = await page.evaluate((markup) => {
        const parsed = new DOMParser().parseFromString(markup, "text/html");
        return {
          lang: parsed.documentElement.lang,
          heading: parsed.querySelector("h1")?.textContent,
          cards: parsed.querySelectorAll("#projetos article").length,
          mainText: parsed.querySelector("main")?.textContent,
          scripts: Array.from(parsed.querySelectorAll('script[src], link[rel="modulepreload"]'))
            .map((element) => element.getAttribute("src") || element.getAttribute("href"))
            .filter((source): source is string => Boolean(source)),
        };
      }, html);
      expect(document.lang, path).toBe(prefix ? "en" : "pt-BR");
      if (project) {
        expect(document.heading, path).toBe(project.title);
        expect(document.mainText, path).toContain(prefix ? "About the project" : "Sobre o projeto");
      } else {
        expect(document.heading, path).toContain(prefix ? "Code with purpose." : "Código com propósito.");
        expect(document.cards, path).toBe(3);
        for (const item of projects) expect(document.mainText, path).toContain(item.title);
      }
      expect(document.scripts.length, `${path} exposes a JavaScript asset`).toBeGreaterThan(0);
      const assetURL = new URL(document.scripts[0], response.url());
      expect(assetURL.origin).toBe(new URL(response.url()).origin);
      const asset = await request.get(assetURL.href);
      expect(asset.status()).toBe(200);
      expect(asset.headers()["content-type"]).toMatch(/(?:javascript|ecmascript)/i);
      expect(await asset.text()).not.toMatch(/^\s*(?:<!doctype html|<html)/i);
    }
  }
});

test("missing routes return HTTP 404 and a usable way home", async ({ page }) => {
  for (const path of ["/missing-portfolio-route/", "/projetos/missing-portfolio-route/"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const home = page.getByRole("link", { name: "Voltar ao início", exact: true });
    await expect(home).toHaveAttribute("href", "/");
    await home.click();
    await expect(page).toHaveURL("/");
    await expect(page.locator("#projetos article")).toHaveCount(3);
  }
});

test("legacy portfolio URLs resolve to the projects section", async ({ page }) => {
  for (const path of ["/#/portfolio", "/portfolio/"]) {
    await page.goto(path);
    await expect(page).toHaveURL("/#projetos");
    await expect(page.locator("#projetos")).toBeVisible();
    await expect(page.locator("#projetos article")).toHaveCount(3);
  }
});

test("copy email announces success and handles clipboard denial without side effects", async ({ page }) => {
  await page.goto("/#contato");
  const copied: string[] = [];
  await page.exposeFunction("recordClipboardWrite", (text: string) => copied.push(text));
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          await (window as unknown as { recordClipboardWrite: (value: string) => Promise<void> }).recordClipboardWrite(text);
        },
      },
    });
  });
  const button = page.getByRole("button", { name: "Copiar e-mail", exact: true });
  await button.click();
  await expect(page.getByRole("status")).toHaveText("E-mail copiado.");
  expect(copied).toEqual(["rafascerqueira.dev@gmail.com"]);
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => { throw new DOMException("Permission denied", "NotAllowedError"); } },
    });
  });
  await button.click();
  await expect(page.getByRole("status")).toContainText("Não foi possível copiar.");
  expect(copied).toEqual(["rafascerqueira.dev@gmail.com"]);
  await expect(page.locator("#contato").getByRole("link", { name: "Enviar e-mail", exact: true }))
    .toHaveAttribute("href", "mailto:rafascerqueira.dev@gmail.com");
});
