# Studio di psicoanalisi — Marco Canova

Sito dello studio di **Marco Canova**, psicologo, psicoterapeuta e psicoanalista lacaniano a Bologna (Via San Giorgio 3, albo Emilia-Romagna n. 6544).

Stack: **Next.js (App Router)**, TypeScript, Tailwind CSS, Prisma e SQLite.

## Requisiti

- Node.js 20 o successivo
- npm

## Avvio in locale

```bash
cp .env.example .env
```

Modifica `.env`:

- `ADMIN_PASSWORD` — password dell’area admin
- `AUTH_SECRET` — stringa casuale per firmare il cookie di sessione
- `DATABASE_URL` — lascia `file:./dev.db` per SQLite (file in `prisma/dev.db`)

Poi:

```bash
npm install
npx prisma db push
npm run db:seed
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

- Pubblico: home, chi sono, blog, prenotazione
- Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login) con `ADMIN_PASSWORD`

Lo seed crea tre articoli pubblicati e slot di disponibilità (martedì e giovedì, 15:00–17:50, per le tre settimane successive).

## Script

| Comando | Effetto |
| --- | --- |
| `npm run dev` | Server di sviluppo |
| `npm run build` | Genera Prisma, allinea lo schema SQLite, build di produzione |
| `npm run start` | Avvia la build |
| `npm run db:seed` | Inserisce articoli e slot (cancella i dati esistenti) |
| `npm run db:reset` | Ricrea il database e lancia lo seed |

## Funzioni

1. **Home / Chi sono** — presentazione dello studio e del professionista
2. **Blog** — articoli pubblici; in admin si creano, modificano, pubblicano o tolgono
3. **Prenotazione** — scelta di uno slot, nome, email, telefono, nota; in admin si gestiscono richieste e disponibilità
4. **Login admin** — cookie httpOnly firmato, password da `ADMIN_PASSWORD`

Le richieste restano *in attesa* finché non vengono confermate o annullate. L’annullamento riapre lo slot.

## Produzione

Non usare la password di esempio. Imposta `ADMIN_PASSWORD` e `AUTH_SECRET` forti. SQLite va bene per un singolo processo; per un deploy con più istanze serve un database condiviso.

Il sito WordPress locale in `Studio/marco-canova-psicoanalista` non fa parte di questo progetto e non va modificato da qui.
