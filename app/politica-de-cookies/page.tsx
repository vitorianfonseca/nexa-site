import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import s from "../legal.module.css";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Informação sobre os cookies utilizados no website bynexa.dev.",
  robots: { index: false, follow: false },
};

const LAST_UPDATED = "28 de abril de 2026";

export default function CookiePolicy() {
  return (
    <main className="min-h-screen" style={{ background: "#FAFAF8" }}>
      <div className="border-b" style={{ borderColor: "rgba(26,26,26,0.06)" }}>
        <div className="max-w-3xl mx-auto px-6 py-8 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-medium tracking-[0.12em] uppercase transition-opacity hover:opacity-60"
            style={{ color: "rgba(26,26,26,0.45)" }}
          >
            ← bynexa.dev
          </Link>
          <span className="text-xs" style={{ color: "rgba(26,26,26,0.35)" }}>
            Atualizado em {LAST_UPDATED}
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">
        <h1
          className="font-bold tracking-[-0.03em] mb-3"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#111111" }}
        >
          Política de Cookies
        </h1>
        <p className="text-sm mb-12" style={{ color: "rgba(26,26,26,0.5)" }}>
          Última atualização: {LAST_UPDATED}
        </p>

        <div className={s.prose}>

          <Section title="O que são cookies?">
            <p>
              Cookies são pequenos ficheiros de texto guardados no seu dispositivo quando visita
              um website. Permitem que o site funcione corretamente, recorde as suas preferências
              e nos ajude a perceber como é utilizado.
            </p>
          </Section>

          <Section title="Cookies que utilizamos">
            <p className={s.categoryLabel}>Cookies Estritamente Necessários</p>
            <p>
              Essenciais para o funcionamento do website. <strong>Não requerem consentimento</strong>{" "}
              e não podem ser desativados.
            </p>
            <CookieTable rows={[
              ["nexa_cookie_consent", "byNexa", "Guarda as suas preferências de cookies", "1 ano"],
            ]} />

            <p className={s.categoryLabel}>Cookies Analíticos</p>
            <p>
              Ajudam-nos a perceber como os visitantes utilizam o website.{" "}
              <strong>Só são ativados com o seu consentimento.</strong>
            </p>
            <CookieTable rows={[
              ["_ga", "Google Analytics", "Identificar sessões únicas de utilizador", "2 anos"],
              ["_ga_*", "Google Analytics", "Manter o estado da sessão Analytics", "2 anos"],
            ]} />
            <p style={{ fontSize: "0.8rem", color: "rgba(26,26,26,0.5)" }}>
              Os dados do Google Analytics são anonimizados e processados ao abrigo do Data Privacy
              Framework UE-EUA.{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className={s.link}>
                Opt-out do Google Analytics
              </a>
            </p>
          </Section>

          <Section title="Como gerir os seus cookies">
            <p>Tem várias formas de controlar os cookies:</p>
            <ul>
              <li>
                <strong>Neste website:</strong> use o botão &ldquo;Preferências de cookies&rdquo; no rodapé
                para alterar as suas escolhas a qualquer momento.
              </li>
              <li>
                <strong>No seu browser:</strong> pode bloquear ou apagar cookies nas definições
                do browser. Note que isso pode afetar algumas funcionalidades.
              </li>
              <li>
                <strong>Google Analytics:</strong>{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className={s.link}>
                  extensão de opt-out
                </a>
              </li>
            </ul>
          </Section>

          <Section title="Alterações a esta política">
            <p>
              Esta política pode ser atualizada quando introduzirmos novas ferramentas ou cookies.
              A data no topo indica a versão mais recente.
            </p>
          </Section>

          <Section title="Contacto">
            <p>
              Para qualquer questão sobre cookies ou privacidade:{" "}
              <a href="mailto:hello@bynexa.dev" className={s.link}>hello@bynexa.dev</a>
            </p>
          </Section>

          <div className="mt-12 pt-8" style={{ borderTop: "0.5px solid rgba(26,26,26,0.08)" }}>
            <Link href="/politica-de-privacidade" className={s.link} style={{ fontSize: "0.875rem" }}>
              Ver também: Política de Privacidade →
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2
        className="font-semibold tracking-[-0.02em]"
        style={{ fontSize: "1rem", color: "#111111", marginBottom: "1rem" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function CookieTable({ rows }: { rows: string[][] }) {
  const headers = ["Cookie", "Fornecedor", "Finalidade", "Duração"];
  return (
    <div className="overflow-x-auto my-4 rounded-xl" style={{ border: "0.5px solid rgba(26,26,26,0.08)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
        <thead>
          <tr style={{ background: "rgba(42,19,99,0.04)" }}>
            {headers.map((h) => (
              <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "rgba(26,26,26,0.6)", borderBottom: "0.5px solid rgba(26,26,26,0.08)", whiteSpace: "nowrap" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? "0.5px solid rgba(26,26,26,0.06)" : "none" }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "10px 14px", color: j === 0 ? "rgba(26,26,26,0.85)" : "rgba(26,26,26,0.65)", fontWeight: j === 0 ? 500 : 400, fontFamily: j === 0 ? "var(--font-geist-mono), monospace" : "inherit", fontSize: j === 0 ? "0.78rem" : "0.82rem", verticalAlign: "top" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
