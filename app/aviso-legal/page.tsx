import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import s from "../legal.module.css";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Informação legal sobre o website bynexa.dev e o seu operador.",
  robots: { index: false, follow: false },
};

const LAST_UPDATED = "30 de abril de 2026";

export default function LegalNotice() {
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
          Aviso Legal
        </h1>
        <p className="text-sm mb-12" style={{ color: "rgba(26,26,26,0.5)" }}>
          Última atualização: {LAST_UPDATED}
        </p>

        <div className={s.prose}>

          <Section title="1. Identificação do operador">
            <p>
              O website <strong>bynexa.dev</strong> é operado por:
            </p>
            <Table rows={[
              ["Nome comercial", "byNexa"],
              ["NIF", "275973620"],
              ["Localização", "Leiria, Portugal"],
              ["Email", "hello@bynexa.dev"],
              ["Website", "https://bynexa.dev"],
            ]} />
            <p>
              Prestador de serviços de desenvolvimento web, registado em Portugal, sujeito à
              legislação portuguesa e europeia aplicável.
            </p>
          </Section>

          <Section title="2. Âmbito do website">
            <p>
              Este website destina-se à apresentação dos serviços da byNexa e ao contacto com
              potenciais clientes. Não é realizada venda direta de produtos ou serviços através
              do website.
            </p>
          </Section>

          <Section title="3. Propriedade intelectual">
            <p>
              Todo o conteúdo presente neste website — incluindo textos, logótipos, imagens,
              design e código-fonte — é propriedade da byNexa ou está licenciado para uso pela
              byNexa, sendo protegido pelas leis de direito de autor aplicáveis.
            </p>
            <p>
              É proibida a reprodução, distribuição ou utilização comercial de qualquer conteúdo
              sem autorização prévia e escrita da byNexa.
            </p>
          </Section>

          <Section title="4. Responsabilidade">
            <p>
              A byNexa não se responsabiliza por danos diretos ou indiretos resultantes do acesso
              ou utilização deste website, nem pela indisponibilidade temporária do serviço.
            </p>
            <p>
              Os links para websites externos são disponibilizados por conveniência. A byNexa não
              controla nem é responsável pelo conteúdo de terceiros.
            </p>
          </Section>

          <Section title="5. Lei aplicável e foro">
            <p>
              Este aviso legal é regido pela lei portuguesa. Para qualquer litígio relativo ao
              website, é competente o tribunal da comarca de Leiria, salvo disposição legal em
              contrário.
            </p>
            <p>
              Para resolução alternativa de litígios, pode recorrer ao{" "}
              <a
                href="https://www.cniacc.pt"
                target="_blank"
                rel="noopener noreferrer"
                className={s.link}
              >
                CNIACC — Centro Nacional de Informação e Arbitragem de Conflitos de Consumo
              </a>.
            </p>
          </Section>

          <Section title="6. Reclamações">
            <p>
              Para apresentar uma reclamação, pode utilizar o{" "}
              <a
                href="https://www.livroreclamacoes.pt/Inicio/"
                target="_blank"
                rel="noopener noreferrer"
                className={s.link}
              >
                Livro de Reclamações Eletrónico
              </a>.
            </p>
          </Section>

          <Section title="7. Contacto">
            <p>
              Para qualquer questão relacionada com este aviso legal:{" "}
              <a href="mailto:hello@bynexa.dev" className={s.link}>hello@bynexa.dev</a>
            </p>
          </Section>

          <div className="mt-12 pt-8 flex flex-wrap gap-4" style={{ borderTop: "0.5px solid rgba(26,26,26,0.08)" }}>
            <Link href="/politica-de-privacidade" className={s.link} style={{ fontSize: "0.875rem" }}>
              Política de Privacidade →
            </Link>
            <Link href="/termos-e-condicoes" className={s.link} style={{ fontSize: "0.875rem" }}>
              Termos e Condições →
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

function Table({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4 rounded-xl" style={{ border: "0.5px solid rgba(26,26,26,0.08)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? "0.5px solid rgba(26,26,26,0.06)" : "none" }}>
              <td style={{ padding: "10px 14px", color: "rgba(26,26,26,0.5)", fontWeight: 500, width: "35%", verticalAlign: "top" }}>
                {row[0]}
              </td>
              <td style={{ padding: "10px 14px", color: "rgba(26,26,26,0.75)", verticalAlign: "top" }}>
                {row[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
