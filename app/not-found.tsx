import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button";
import { sitePath } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found | Lumina",
  description: "The requested page could not be found. Visit Lumina for downloads and help.",
};

export default function NotFound() {
  return (
    <main id="main" className="paper-surface grid min-h-svh items-center py-section">
      <section
        aria-labelledby="error-title"
        className="wrap grid justify-items-start gap-4"
      >
        <Image
          src={sitePath("/assets/lumina-icon.png")}
          alt=""
          width={48}
          height={48}
        />
        <h1 id="error-title" className="text-display">
          Page not found.
        </h1>
        <p className="text-muted">
          The page may have moved. Head back to Lumina for downloads and help.
        </p>
        <ButtonLink href={sitePath("/")} variant="primary">
          Go to Lumina
        </ButtonLink>
      </section>
    </main>
  );
}
