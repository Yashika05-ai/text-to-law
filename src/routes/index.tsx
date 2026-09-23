import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/nyaya-app";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "NyayaSaathi AI — Understand documents. Prepare questions." },
    { name: "description", content: "Understand legal documents in plain language and prepare thoughtful questions for a qualified legal professional." },
    { property: "og:title", content: "NyayaSaathi AI — Understand documents. Prepare questions." },
    { property: "og:description", content: "Informational legal document assistance to help you prepare better questions." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: LandingPage,
});