import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/chi-sono", label: "Chi sono" },
  { href: "/blog", label: "Blog" },
  { href: "/prenota", label: "Prenota" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line/80 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-5 py-5">
        <Link href="/" className="group">
          <p className="font-serif text-xl tracking-tight text-ink sm:text-2xl">{site.name}</p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Psicoanalisi · Bologna</p>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-ink/80">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-sage-dark">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-lg text-ink">{site.name}</p>
          <p>{site.role}</p>
          <p>{site.address}</p>
          <p>{site.albo}</p>
        </div>
        <div className="space-y-1">
          <p>
            <a className="hover:text-ink" href={site.phoneHref}>
              {site.phone}
            </a>
          </p>
          <p>
            <a className="hover:text-ink" href={site.emailHref}>
              {site.email}
            </a>
          </p>
          <p>
            <Link className="text-xs uppercase tracking-wider hover:text-ink" href="/privacy">
              Privacy
            </Link>
          </p>
          <p>
            <Link className="text-xs uppercase tracking-wider hover:text-ink" href="/admin/login">
              Area riservata
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
