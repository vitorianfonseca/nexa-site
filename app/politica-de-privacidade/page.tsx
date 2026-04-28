import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import s from "../legal.module.css";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Saiba como a byNexa recolhe, usa e protege os seus dados pessoais.",
  robots: { index: false, follow: false },
};

const LAST_UPDATED = "28 de abril de 2026";

export default function PrivacyPolicy() {
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
          Política de Privacidade
        </h1>
        <p className="text-sm mb-12" style={{ color: "rgba(26,26,26,0.5)" }}>
          Última atualização: {LAST_UPDATED}
        </p>

        <div className={s.prose}>

          <Section title="1. Quem somos">
            <p>
              A <strong>byNexa</strong> é responsável pelo tratamento dos dados pessoais recolhidos
              através do website <strong>bynexa.dev</strong>.
            </p>
            <Table rows={[
              ["Empresa", "byNexa"],
              ["Website", "https://bynexa.dev"],
              ["Email de contacto", "hello@bynexa.dev"],
              ["Localização", "Leiria, Portugal"],
            ]} />
          </Section>

          <Section title="2. Que dados recolhemos e porquê">
            <p>Apenas recolhemos dados estritamente necessários para prestar o nosso serviço.</p>
            <Table headers={["Dados", "Finalidade", "Base legal", "Retenção"]} rows={[
              ["Nome, email, empresa, mensagem", "Responder a pedidos de contacto e orçamento", "Interesse legítimo", "2 anos"],
              ["Endereço IP", "Segurança (limitação de pedidos)", "Interesse legítimo", "Sessão / memória temporária"],
              ["Cookies analíticos (_ga, _ga_*)", "Estatísticas de utilização do website", "Consentimento", "13 meses"],
            ]} />
          </Section>

          <Section title="3. Com quem partilhamos os seus dados">
            <p>Os seus dados podem ser processados pelas seguintes entidades, sempre com garantias contratuais adequadas:</p>
            <ul>
              <li>
                <strong>Google Analytics</strong> — análise de tráfego do website.
                Dados armazenados nos EUA ao abrigo do Data Privacy Framework UE-EUA.
                Só ativo com o seu consentimento.
              </li>
              <li>
                <strong>Google (Gmail/Workspace)</strong> — envio do email de resposta ao seu pedido.
                Servidores na UE (Frankfurt).
              </li>
            </ul>
            <p>Nunca vendemos os seus dados a terceiros.</p>
          </Section>

          <Section title="4. Os seus direitos">
            <p>Ao abrigo do RGPD, tem os seguintes direitos:</p>
            <ul>
              <li><strong>Acesso</strong> — saber que dados temos sobre si</li>
              <li><strong>Retificação</strong> — corrigir dados incorretos ou incompletos</li>
              <li><strong>Apagamento</strong> — solicitar a eliminação dos seus dados</li>
              <li><strong>Portabilidade</strong> — receber os seus dados num formato legível por máquina</li>
              <li><strong>Oposição</strong> — opor-se ao tratamento baseado em interesse legítimo</li>
              <li><strong>Limitação</strong> — restringir o tratamento em determinadas circunstâncias</li>
              <li><strong>Retirar consentimento</strong> — a qualquer momento, sem prejuízo do tratamento anterior</li>
            </ul>
            <p>
              Para exercer qualquer direito, contacte-nos:{" "}
              <a href="mailto:hello@bynexa.dev" className={s.link}>hello@bynexa.dev</a>.
              Respondemos em até 30 dias.
            </p>
            <p>
              Tem também o direito de apresentar reclamação à{" "}
              <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className={s.link}>
                CNPD — Comissão Nacional de Proteção de Dados
              </a>.
            </p>
          </Section>

          <Section title="5. Segurança">
            <p>
              Adotamos medidas técnicas e organizacionais adequadas para proteger os seus dados,
              incluindo transmissão via HTTPS/TLS, acesso restrito a pessoal autorizado e
              revisão periódica das nossas práticas de segurança.
            </p>
          </Section>

          <Section title="6. Menores">
            <p>
              Este website não se destina a menores de 16 anos e não recolhemos conscientemente
              dados pessoais de menores. Se identificarmos recolha acidental, apagamos os dados imediatamente.
            </p>
          </Section>

          <Section title="7. Alterações a esta política">
            <p>
              Podemos atualizar esta política quando necessário. A data de &ldquo;última atualização&rdquo;
              no topo indica quando foi revista pela última vez. Alterações relevantes serão
              comunicadas de forma visível no website.
            </p>
          </Section>

          <Section title="8. Contacto">
            <p>
              Para qualquer questão sobre privacidade ou proteção de dados:{" "}
              <a href="mailto:hello@bynexa.dev" className={s.link}>hello@bynexa.dev</a>
            </p>
          </Section>

          <div className="mt-12 pt-8" style={{ borderTop: "0.5px solid rgba(26,26,26,0.08)" }}>
            <Link href="/politica-de-cookies" className={s.link} style={{ fontSize: "0.875rem" }}>
              Ver também: Política de Cookies →
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

function Table({ headers, rows }: { headers?: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4 rounded-xl" style={{ border: "0.5px solid rgba(26,26,26,0.08)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
        {headers && (
          <thead>
            <tr style={{ background: "rgba(42,19,99,0.04)" }}>
              {headers.map((h) => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "rgba(26,26,26,0.6)", borderBottom: "0.5px solid rgba(26,26,26,0.08)", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? "0.5px solid rgba(26,26,26,0.06)" : "none" }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "10px 14px", color: j === 0 && !headers ? "rgba(26,26,26,0.5)" : "rgba(26,26,26,0.75)", fontWeight: j === 0 && !headers ? 500 : 400, verticalAlign: "top" }}>
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
