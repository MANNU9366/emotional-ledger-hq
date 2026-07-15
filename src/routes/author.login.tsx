import { createFileRoute } from "@tanstack/react-router";
import { AuthCard } from "@/components/site/AuthCard";
import { LoginForm } from "@/components/site/LoginForm";

export const Route = createFileRoute("/author/login")({
  head: () => ({ meta: [{ title: "Author sign in — Emotional Ledger" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <AuthCard eyebrow="Author" title="Author sign in." subtitle="See enquiries, workshop requests, and reader signals.">
      <LoginForm requiredRole="author" redirectTo="/author/dashboard" />
    </AuthCard>
  ),
});