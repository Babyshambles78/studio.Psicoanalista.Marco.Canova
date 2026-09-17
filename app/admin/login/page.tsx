import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { isAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Accesso amministratore",
};

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <h1 className="font-serif text-4xl">Area riservata</h1>
      <p className="mt-3 mb-8 text-muted">Accesso per la gestione di blog e appuntamenti.</p>
      <div className="rounded-2xl border border-line bg-white px-6 py-8">
        <LoginForm />
      </div>
    </div>
  );
}
