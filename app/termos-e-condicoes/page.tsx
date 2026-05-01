import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import s from "../legal.module.css";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description: "Termos e condições de prestação de serviços da byNexa.",
  robots: { index: false, follow: false },
};

const LAST_UPDATED = "30 de abril de 2026";

export default function TermsAndConditions() {
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
          Termos e Condições
        </h1>
        <p className="text-sm mb-12" style={{ color: "rgba(26,26,26,0.5)" }}>
          Última atualização: {LAST_UPDATED}
        </p>

        <div className={s.prose}>

          <Section title="1. Partes e âmbito">
            <p>
              Estes Termos e Condições regulam a prestação de serviços de desenvolvimento web
              entre a <strong>byNexa</strong> (NIF 275973620, &ldquo;Prestador&rdquo;) e o
              cliente que contrata os seus serviços (&ldquo;Cliente&rdquo;).
            </p>
            <p>
              A aceitação de um orçamento ou o início de qualquer trabalho implica a aceitação
              integral destes termos.
            </p>
          </Section>

          <Section title="2. Serviços prestados">
            <p>
              A byNexa presta serviços de design e desenvolvimento web, incluindo mas não
              limitado a: websites institucionais, landing pages, aplicações web e lojas online.
            </p>
            <p>
              O âmbito exato de cada projeto é definido em proposta ou orçamento escrito aceite
              pelo Cliente. Alterações ao âmbito acordado podem implicar revisão de prazo e preço.
            </p>
          </Section>

          <Section title="3. Orçamentos e pagamentos">
            <ul>
              <li>Os orçamentos têm validade de <strong>30 dias</strong> a partir da data de emissão.</li>
              <li>
                Salvo acordo diferente por escrito, aplica-se o seguinte esquema de pagamento:
                <ul>
                  <li><strong>50%</strong> no início do projeto (sinal)</li>
                  <li><strong>50%</strong> na entrega final</li>
                </ul>
              </li>
              <li>As faturas têm prazo de pagamento de <strong>15 dias</strong>.</li>
              <li>
                O atraso no pagamento confere à byNexa o direito de suspender o trabalho e/ou
                cobrar juros de mora legais.
              </li>
            </ul>
          </Section>

          <Section title="4. Prazos e entregas">
            <p>
              Os prazos indicados são estimativas e dependem da entrega atempada de conteúdos,
              feedback e aprovações por parte do Cliente. Atrasos imputáveis ao Cliente não
              responsabilizam a byNexa.
            </p>
            <p>
              A byNexa compromete-se a comunicar proativamente quaisquer desvios relevantes ao
              prazo acordado.
            </p>
          </Section>

          <Section title="5. Propriedade intelectual">
            <p>
              Após liquidação integral do valor acordado, o Cliente adquire os direitos de
              utilização sobre os trabalhos desenvolvidos especificamente para o seu projeto
              (design, conteúdos, código personalizado).
            </p>
            <p>
              Ferramentas, frameworks, bibliotecas e componentes de terceiros utilizados no
              projeto ficam sujeitos às respetivas licenças de software.
            </p>
            <p>
              A byNexa reserva o direito de apresentar o projeto no seu portfólio, salvo acordo
              de confidencialidade.
            </p>
          </Section>

          <Section title="6. Responsabilidades do cliente">
            <p>O Cliente é responsável por:</p>
            <ul>
              <li>Fornecer conteúdos, imagens e informações necessárias ao projeto.</li>
              <li>
                Garantir que detém os direitos sobre todos os materiais entregues à byNexa.
              </li>
              <li>Rever e aprovar entregas dentro dos prazos acordados.</li>
              <li>
                Manter as credenciais de acesso (hosting, domínio, CMS) em segurança.
              </li>
            </ul>
          </Section>

          <Section title="7. Limitação de responsabilidade">
            <p>
              A byNexa não é responsável por perdas indiretas, lucros cessantes ou danos
              emergentes resultantes da utilização ou indisponibilidade do website entregue.
            </p>
            <p>
              A responsabilidade total da byNexa perante o Cliente, em qualquer circunstância,
              não excederá o valor pago pelo projeto em causa.
            </p>
          </Section>

          <Section title="8. Confidencialidade">
            <p>
              Ambas as partes comprometem-se a manter confidencialidade sobre informações
              sensíveis partilhadas no âmbito do projeto (dados de negócio, estratégias,
              credenciais de acesso), durante e após a vigência do contrato.
            </p>
          </Section>

          <Section title="9. Rescisão">
            <p>
              Qualquer das partes pode rescindir o contrato mediante aviso prévio escrito de
              <strong> 15 dias</strong>. Em caso de rescisão pelo Cliente, é devido o
              pagamento proporcional ao trabalho realizado até à data.
            </p>
            <p>
              A byNexa pode rescindir imediatamente em caso de incumprimento grave pelo Cliente,
              incluindo falta de pagamento superior a 30 dias.
            </p>
          </Section>

          <Section title="10. Alterações aos termos">
            <p>
              A byNexa pode atualizar estes termos a qualquer momento. A versão aplicável a cada
              projeto é a que estiver em vigor na data de aceitação do orçamento.
            </p>
          </Section>

          <Section title="11. Lei aplicável e litígios">
            <p>
              Estes termos são regidos pela lei portuguesa. Em caso de litígio, as partes
              procurarão uma resolução amigável. Na ausência de acordo, é competente o tribunal
              da comarca de Leiria.
            </p>
            <p>
              Para resolução alternativa de conflitos de consumo, pode recorrer ao{" "}
              <a
                href="https://www.cniacc.pt"
                target="_blank"
                rel="noopener noreferrer"
                className={s.link}
              >
                CNIACC
              </a>.
            </p>
          </Section>

          <Section title="12. Contacto">
            <p>
              Para qualquer questão relativa a estes termos:{" "}
              <a href="mailto:hello@bynexa.dev" className={s.link}>hello@bynexa.dev</a>
            </p>
          </Section>

          <div className="mt-12 pt-8 flex flex-wrap gap-4" style={{ borderTop: "0.5px solid rgba(26,26,26,0.08)" }}>
            <Link href="/aviso-legal" className={s.link} style={{ fontSize: "0.875rem" }}>
              Aviso Legal →
            </Link>
            <Link href="/politica-de-privacidade" className={s.link} style={{ fontSize: "0.875rem" }}>
              Política de Privacidade →
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
