import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const sections: Record<string, string> = { portfolio: "projetos", service: "atuacao", skills: "sobre", contact: "contato" };

export default function Legacy() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const destination = `/#${sections[pathname.split("/").filter(Boolean)[0]] ?? "inicio"}`;
  useEffect(() => { void navigate(destination, { replace: true }); }, [destination, navigate]);
  return <section className="section container error-page"><p className="eyebrow">Rafael Cerqueira</p><h1>Um novo lugar para as mesmas ideias.</h1><p>Esta seção agora faz parte da página principal.</p><Link className="button button-primary" to={destination}>Continuar para o portfólio</Link></section>;
}
