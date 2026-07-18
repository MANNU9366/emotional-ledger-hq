import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Emotional Ledger" }, { name: "robots", content: "noindex" }] }),
  component: () => <Navigate to="/dashboard/admin" replace />,
});