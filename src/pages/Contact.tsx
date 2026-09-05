import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const email = "rafascerqueira.dev@gmail.com";
const copy = {
  pt: {
    eyebrow: "Contato",
    title: "Vamos construir algo que faça sentido?",
    description: "Uma ideia, um desafio de backend ou uma conversa sobre dados. Me conte o que você tem em mente.",
    email: "Enviar e-mail",
    copy: "Copiar e-mail",
    copied: "E-mail copiado.",
    failed: "Não foi possível copiar. Você pode selecionar o endereço ou usar o link de e-mail.",
    social: "Encontre-me também em",
  },
  en: {
    eyebrow: "Contact",
    title: "Let's build something meaningful.",
    description: "An idea, a backend challenge or a conversation about data. Tell me what you have in mind.",
    email: "Send an email",
    copy: "Copy email",
    copied: "Email copied.",
    failed: "Couldn't copy. You can select the address or use the email link.",
    social: "You can also find me on",
  },
} as const;

type CopyStatus = "idle" | "copied" | "failed";

export function Contact() {
  const { language } = useLanguage();
  const content = copy[language];
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  return (
    <section id="contato" className="section contact-section" aria-labelledby="contact-title">
      <div className="container contact-grid" data-reveal>
        <div className="contact-copy">
          <p className="eyebrow"><span className="section-index">04 /</span> {content.eyebrow}</p>
          <h2 id="contact-title" className="section-title">{content.title}</h2>
          <p className="section-description">{content.description}</p>
          <a className="button button-primary" href={`mailto:${email}`}>{content.email}<ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
        <div className="contact-details">
          <Mail className="contact-mail-icon" size={28} aria-hidden="true" />
          <a className="contact-email" href={`mailto:${email}`}>{email}</a>
          <button className="text-link copy-email" type="button" onClick={copyEmail}>
            {copyStatus === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}{content.copy}
          </button>
          <p className="copy-status" role="status" aria-live="polite" aria-atomic="true">{copyStatus === "idle" ? "" : content[copyStatus]}</p>
          <p className="contact-social-label">{content.social}</p>
          <div className="contact-links">
            <a className="text-link" href="https://www.linkedin.com/in/rafascerqueira/" target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={15} aria-hidden="true" /></a>
            <a className="text-link" href="https://github.com/rafascerqueira" target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
