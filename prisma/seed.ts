import { prisma } from "../lib/prisma";

const posts = [
  {
    title: "Che cos’è la psicoanalisi lacaniano-orientata",
    slug: "che-cose-la-psicoanalisi-lacaniana",
    excerpt:
      "Una pratica della parola, non un protocollo. Alcune note su come si lavora in questo studio.",
    content: `La psicoanalisi non promette un benessere standard. Si tratta di una pratica in cui si parla, e in cui si ascolta ciò che nella parola eccede l’intenzione, il racconto già pronto, il sintomo ridotto a etichetta.

L’orientamento lacaniano prende sul serio che il soggetto è parlato dal linguaggio: lapsus, ripetizioni, sogni, impasse nei rapporti. Non si tratta di “correggere” un comportamento, ma di far posto a una verità particolare, che non si trova nei manuali.

Il lavoro richiede tempo e una frequenza da concordare. Non è una consulenza breve e non è un percorso a tappe prefissate. Si inizia da un primo colloquio, in cui si valuta insieme se questa pratica è indicata e se c’è il desiderio di proseguire.`,
  },
  {
    title: "Il primo colloquio",
    slug: "il-primo-colloquio",
    excerpt:
      "Cosa aspettarsi dal primo incontro: non una diagnosi calata dall’alto, ma l’inizio di un discorso.",
    content: `Il primo colloquio serve a situare una domanda. Si può arrivare con un malessere preciso, con un’angoscia senza nome, con un’insonnia, un lutto, un conflitto, un’impasse sentimentale o professionale. Non è necessario avere già “chiaro” il problema.

In studio si ascolta. Si possono chiedere alcuni elementi di contesto, ma non si procede per questionari. Al termine, o dopo alcuni colloqui preliminari, si decide se avviare un lavoro analitico, con quale frequenza, e a quali condizioni.

La riservatezza è parte del quadro. I dati raccolti per la prenotazione servono solo all’organizzazione degli incontri.`,
  },
  {
    title: "Sintomo, ripetizione, desiderio",
    slug: "sintomo-ripetizione-desiderio",
    excerpt:
      "Perché si ripete ciò che fa soffrire, e come la parola può spostare un destino già scritto.",
    content: `Molte persone arrivano dicendo: “Lo so, eppure lo rifaccio”. La ripetizione non è un difetto di volontà. È un modo in cui il sintomo tiene insieme, a volte da anni, un equilibrio precario.

La psicoanalisi non elimina il sintomo come si toglie un dente. Lavora perché possa cambiare funzione: da destino muto a enigma parlato. In questo spostamento può farsi spazio un desiderio meno sacrificato, meno alienato alle attese degli altri.

Non è un lavoro per tutti e non è l’unica forma di cura possibile. È una scelta, e va pesata. Per questo il primo passo è un colloquio, non un impegno a tempo indeterminato.`,
  },
];

function upcomingSlots() {
  const slots: { startAt: Date; endAt: Date }[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  for (let offset = 1; offset <= 21; offset += 1) {
    const day = new Date(start);
    day.setDate(start.getDate() + offset);
    const weekday = day.getDay();
    if (weekday !== 2 && weekday !== 4) continue;
    for (const hour of [15, 16, 17]) {
      const startAt = new Date(day);
      startAt.setHours(hour, 0, 0, 0);
      const endAt = new Date(startAt);
      endAt.setMinutes(50);
      slots.push({ startAt, endAt });
    }
  }
  return slots;
}

async function main() {
  await prisma.appointment.deleteMany();
  await prisma.slot.deleteMany();
  await prisma.post.deleteMany();

  for (const post of posts) {
    await prisma.post.create({
      data: {
        ...post,
        published: true,
        publishedAt: new Date(),
      },
    });
  }

  await prisma.slot.createMany({ data: upcomingSlots() });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
