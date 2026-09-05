import { Link, useLocation } from "react-router";

export default function NotFound() {
  const english = /^\/en(?:\/|$)/.test(useLocation().pathname);
  return <section className="section container error-page"><p className="eyebrow">404 / {english ? "Not found" : "Não encontrado"}</p><h1>{english ? "This page took a different path." : "Esta página seguiu outro caminho."}</h1><p>{english ? "You can still explore the projects and get in touch." : "Você ainda pode conhecer os projetos e entrar em contato."}</p><Link className="button button-primary" to={english ? "/en/" : "/"}>{english ? "Back to home" : "Voltar ao início"}</Link></section>;
}
