import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-sage">Informativa</p>
      <h1 className="mt-3 font-serif text-5xl leading-tight">Privacy</h1>
      <p className="mt-4 text-lg text-muted">
        Informativa sul trattamento dei dati personali ai sensi del Regolamento (UE) 2016/679
        (GDPR).
      </p>

      <div className="mt-10 space-y-8 leading-8 text-ink/90">
        <section>
          <h2 className="font-serif text-2xl text-ink">Titolare del trattamento</h2>
          <p className="mt-3">
            {site.name}, {site.role}. {site.address}. {site.albo}.
          </p>
          <p>
            Contatti:{" "}
            <a className="text-sage hover:text-sage-dark" href={site.emailHref}>
              {site.email}
            </a>
            ,{" "}
            <a className="text-sage hover:text-sage-dark" href={site.phoneHref}>
              {site.phone}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">Finalità</h2>
          <p className="mt-3">
            I dati sono trattati per: (1) gestire le richieste di colloquio o appuntamento
            inviate tramite il sito o l’app; (2) rispondere a messaggi di contatto; (3)
            adempiere a obblighi di legge ove applicabili.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">Dati raccolti</h2>
          <p className="mt-3">
            Attraverso il modulo di prenotazione/contatto possono essere raccolti nome,
            recapito (email e/o telefono) e il contenuto del messaggio. Non sono previsti
            profili pubblicitari né tracking di marketing di terze parti sul sito.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">Base giuridica</h2>
          <p className="mt-3">
            Trattamento necessario all’esecuzione di misure precontrattuali su richiesta
            dell’interessato e, ove applicabile, al legittimo interesse a rispondere alle
            comunicazioni ricevute.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">Conservazione</h2>
          <p className="mt-3">
            I dati delle richieste sono conservati per il tempo necessario a gestire la
            comunicazione e, se nasce un rapporto professionale, secondo gli obblighi di
            conservazione previsti per l’attività sanitaria/professionale. In assenza di
            seguito, i messaggi possono essere cancellati dopo un periodo ragionevole.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">Diritti</h2>
          <p className="mt-3">
            Puoi chiedere accesso, rettifica, cancellazione, limitazione o opposizione
            scrivendo a{" "}
            <a className="text-sage hover:text-sage-dark" href={site.emailHref}>
              {site.email}
            </a>
            . Hai inoltre diritto di proporre reclamo al Garante per la protezione dei dati
            personali.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">App mobile</h2>
          <p className="mt-3">
            L’app «Psicoanalisi» mostra questo sito. Non aggiunge raccolta dati diversa da
            quella del sito, salvo quanto tecnico necessario al funzionamento del dispositivo
            e della connessione.
          </p>
        </section>

        <p className="text-sm text-muted">Ultimo aggiornamento: settembre 2026.</p>
        <p>
          <Link href="/" className="text-sage hover:text-sage-dark">
            ← Torna alla home
          </Link>
        </p>
      </div>
    </article>
  );
}
