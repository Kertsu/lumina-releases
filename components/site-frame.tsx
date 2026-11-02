import Image from "next/image";
import type { ReactNode } from "react";
import { guideUrl, reportUrl, repository, sitePath } from "@/lib/site";
import { ButtonLink } from "./button";

type Page = "home" | "download" | "support";

const footerLinks = [
  { label: "Buy me a coffee", href: sitePath("/support/") },
  { label: "App guide", href: guideUrl },
  { label: "License", href: `${repository}/blob/main/LICENSE` },
  { label: "Third party notices", href: `${repository}/blob/main/THIRD_PARTY.md` },
  { label: "Privacy", href: `${repository}/blob/main/PRIVACY.md` },
  { label: "Media credits", href: sitePath("/assets/CREDITS.txt") },
];

function Brand({ size, current }: { size: number; current?: boolean }) {
  return (
    <a
      href={sitePath("/")}
      aria-label="Lumina home"
      aria-current={current ? "page" : undefined}
      className="inline-flex min-h-11 w-fit items-center gap-2 text-xl font-medium tracking-[-0.04em] no-underline"
    >
      <Image src={sitePath("/assets/lumina-icon.png")} alt="" width={size} height={size} className="shrink-0" />
      Lumina
    </a>
  );
}

export function SiteFrame({ page, children }: { page: Page; children: ReactNode }) {
  const isHome = page === "home";

  return (
    <>
      <a href="#main" className="fixed top-4 left-4 z-10 -translate-y-[200%] bg-signal px-4 py-2 text-night focus:translate-y-0">Skip to content</a>
      <header className={`wrap flex min-h-[76px] items-center justify-between gap-x-6 max-[32rem]:flex-wrap max-[32rem]:py-2 ${isHome ? "border-b border-night-rule" : ""}`}>
        <Brand size={36} current={isHome} />
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm max-[32rem]:gap-x-3">
          <a href={guideUrl} className="inline-flex min-h-11 items-center no-underline hover:underline">Guide</a>
          <a href={reportUrl} className="inline-flex min-h-11 items-center no-underline hover:underline">Report a bug</a>
          <ButtonLink href={sitePath("/download/")} aria-current={page === "download" ? "page" : undefined} className="max-[32rem]:px-3">Download Lumina</ButtonLink>
        </nav>
      </header>
      {children}
      <footer className="wrap mt-auto pt-16 pb-10 text-sm">
        <div className="flex flex-col gap-x-8 gap-y-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="shrink-0">
            <Brand size={28} />
            <p className="mt-2 text-night-muted">Scripture, ready for the room.</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-1 lg:justify-end">
            {footerLinks.map(({ label, href }) => (
              <a key={href} href={href} aria-current={page === "support" && href === sitePath("/support/") ? "page" : undefined} className="inline-flex min-h-11 items-center no-underline hover:underline">
                {label}
              </a>
            ))}
          </nav>
        </div>
        <p className="mt-8 text-night-muted">© {new Date().getFullYear()} Kurtd Daniel Bigtas</p>
      </footer>
    </>
  );
}
