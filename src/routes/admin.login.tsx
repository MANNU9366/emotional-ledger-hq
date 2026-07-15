import { createFileRoute } from "@tanstack/react-router";
import { AuthCard } from "@/components/site/AuthCard";
import { LoginForm } from "@/components/site/LoginForm";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin sign in — Emotional Ledger" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <AuthCard eyebrow="Admin" title="Moderator sign in." subtitle="Review testimonials, subscribers, enquiries, and orders.">
      <LoginForm requiredRole="admin" redirectTo="/admin/dashboard" />
    </AuthCard>
  ),
});