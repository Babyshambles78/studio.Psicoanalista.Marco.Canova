import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chi sono",
};

export default function ChiSonoPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-sage">Chi sono</p>
      <h1 className="mt-3 font-serif text-5xl leading-tight">{site.name}</h1>
      <p className="mt-4 text-lg text-muted">{site.role}</p>

      <div className="mt-10 space-y-5 leading-8 text-ink/90">
        <p>
          Lavoro a Bologna in studio privato. L’orientamento è psicoanalitico, in particolare
          lacaniano: una pratica della parola, distinta sia dal counselling breve sia dai
          percorsi a protocollo.
        </p>
        <p>
          Laurea in Psicologia Clinica all’Università di Bologna. Specializzazione in
          psicoterapia psicoanalitica presso l’Istituto Freudiano. Iscritto all’
          {site.albo}. Annotato nell’elenco degli psicoterapeuti.
        </p>
        <p>
          Ho lavorato in comunità per minori, in ambito scolastico e come libero professionista.
          Ricevo adolescenti, adulti e, quando indicato, coppie o famiglie, a partire da un
          colloquio preliminare.
        </p>
      </div>

      <aside className="mt-12 rounded-2xl border border-line bg-paper p-6 text-sm leading-7 text-muted">
        <p className="font-medium text-ink">Studio</p>
        <p>{site.address}</p>
        <p>{site.albo}</p>
        <p className="mt-3">
          <Link href="/prenota" className="text-sage hover:text-sage-dark">
            Prenota un colloquio →
          </Link>
        </p>
      </aside>
    </article>
  );
}
