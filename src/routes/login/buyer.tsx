import { createFileRoute } from "@tanstack/react-router";
import { AuthCard } from "@/components/site/AuthCard";
import { LoginForm } from "@/components/site/LoginForm";

export const Route = createFileRoute("/login/buyer")({
  head: () => ({ meta: [{ title: "Reader sign in — Emotional Ledger" }] }),
  component: () => (
    <AuthCard eyebrow="Readers" title="Sign in to your library." subtitle="Track your copies, leave a review, and manage your account.">
      <LoginForm requiredRole="buyer" redirectTo="/dashboard/buyer" />
    </AuthCard>
  ),
});