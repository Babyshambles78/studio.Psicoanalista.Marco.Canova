"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/SubmitButton";

export function LoginForm() {
  const [state, action] = useActionState(loginAction, null);
  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="password" className="mb-2 block text-sm text-muted">
          Password amministratore
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-xl border border-line bg-paper px-3 py-3 text-ink"
        />
      </div>
      {state?.error ? <p className="text-sm text-clay">{state.error}</p> : null}
      <SubmitButton className="w-full rounded-full bg-sage py-3 text-sm text-white hover:bg-sage-dark disabled:opacity-60">
        Entra
      </SubmitButton>
    </form>
  );
}
