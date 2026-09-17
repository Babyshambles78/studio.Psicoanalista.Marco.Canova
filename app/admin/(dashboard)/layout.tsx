import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth";
import { isAdmin } from "@/lib/auth";

const items = [
  { href: "/admin", label: "Quadro" },
  { href: "/admin/post", label: "Blog" },
  { href: "/admin/appuntamenti", label: "Richieste" },
  { href: "/admin/disponibilita", label: "Disponibilità" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="border-t border-line bg-cream">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <nav className="flex flex-wrap gap-4 text-sm">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="text-sage hover:text-sage-dark">
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-muted hover:text-ink">
            Esci
          </button>
        </form>
      </div>
      <div className="mx-auto max-w-5xl px-5 pb-16">{children}</div>
    </div>
  );
}
