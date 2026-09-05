# Portfólio de Rafael Cerqueira

Página pessoal em React, TypeScript e React Router, com páginas estáticas em português e inglês.

## Desenvolvimento

Use Node.js 24 e pnpm 10.17.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

`pnpm check` executa lint, verificação de tipos, build e testes Playwright. Antes da primeira execução dos testes, instale o navegador com `pnpm exec playwright install --with-deps chromium`.

## Publicação

A branch principal e de publicação é `gh-pages`. Ela contém o código-fonte; o GitHub Actions gera e publica os arquivos estáticos de `build/client`.

No repositório, **Settings → Pages → Build and deployment → Source** deve estar definido como **GitHub Actions**. O ambiente `github-pages` deve permitir deploys da branch `gh-pages`.

Para novas alterações:

1. Crie uma branch de trabalho a partir de `gh-pages`.
2. Abra um pull request com destino a `gh-pages`.
3. Aguarde as verificações e faça o merge.
4. Acompanhe o workflow **Verify and publish portfolio** na aba Actions. A publicação acontece após todas as verificações passarem.

Não é necessário instalar o pacote `gh-pages` nem commitar `build/`. O workflow também permite execução manual na branch `gh-pages`.

Site: https://rafascerqueira.github.io/
