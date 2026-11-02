"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { installerIds, installers, suggestedPlatform, validDownloads, type DownloadCatalog, type InstallerId } from "@/lib/downloads";
import { releasesUrl, sitePath } from "@/lib/site";
import { ButtonLink, DownloadIcon } from "./button";

type DownloadState = {
  suggested: InstallerId | null | undefined;
  catalog: DownloadCatalog | null;
};

const DownloadsContext = createContext<DownloadState>({ suggested: undefined, catalog: null });
const subscribe = () => () => {};
const platformFromBrowser = () => suggestedPlatform(navigator);
const platformBeforeHydration = () => undefined;

export function DownloadsProvider({ children }: { children: ReactNode }) {
  const suggested = useSyncExternalStore(subscribe, platformFromBrowser, platformBeforeHydration);
  const [catalog, setCatalog] = useState<DownloadCatalog | null>(null);

  useEffect(() => {
    const request = new AbortController();
    async function load() {
      try {
        const response = await fetch(sitePath("/downloads.json"), { signal: request.signal });
        if (!response.ok) return;
        const payload: unknown = await response.json();
        if (!request.signal.aborted && validDownloads(payload)) setCatalog(payload);
      } catch {
        // Existing platform anchors and GitHub release links remain available.
      }
    }
    void load();
    return () => request.abort();
  }, []);

  return <DownloadsContext value={{ suggested, catalog }}>{children}</DownloadsContext>;
}

export function DownloadActions({ className = "" }: { className?: string }) {
  const { suggested, catalog } = useContext(DownloadsContext);
  const platform = suggested ? installers[suggested] : null;
  const directUrl = suggested ? catalog?.installers[suggested].url : undefined;
  const label = platform ? `Download for ${platform.name}` : suggested === null ? "Choose your platform" : "Download Lumina";

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 max-sm:gap-x-2 ${className}`}>
      <ButtonLink
        variant="primary"
        data-download-auto=""
        href={directUrl ?? sitePath(platform ? `/download/#${platform.anchor}` : "/download/")}
        aria-label={directUrl && platform ? `${label} — ${platform.requirements}` : undefined}
      >
        <DownloadIcon />
        <span data-download-label>{label}</span>
      </ButtonLink>
      <a className="inline-flex min-h-11 items-center text-sm no-underline hover:underline" href={sitePath("/download/")}>Other platforms</a>
    </div>
  );
}

export function PlatformNote({ className = "" }: { className?: string }) {
  const { suggested } = useContext(DownloadsContext);
  return (
    <p className={`text-sm text-night-muted ${className}`} data-platform-note>
      {suggested ? installers[suggested].requirements : "macOS, Windows, and Linux"}
    </p>
  );
}

export function ReleaseStatus() {
  const { catalog } = useContext(DownloadsContext);
  return (
    <p id="release-status" className="inline-block rounded-full bg-paper-raised px-3 py-1 text-sm tabular-nums" aria-live="polite">
      {catalog ? `Version ${catalog.version}` : "Beta downloads are being prepared."}
    </p>
  );
}

export function InstallerList() {
  const { suggested, catalog } = useContext(DownloadsContext);
  return (
    <div className="border-t border-rule">
      {installerIds.map((id) => {
        const platform = installers[id];
        const recommended = suggested === id;
        const label = catalog ? platform.label : "View releases";

        return (
          <article
            key={id}
            id={platform.anchor}
            className={`download-row grid items-center gap-x-columns gap-y-2 border-b border-rule px-4 py-6 target:bg-paper-raised sm:grid-cols-[minmax(0,1fr)_auto] ${recommended ? "is-recommended bg-paper-raised" : ""}`}
          >
            <div>
              <h2 className="mb-2 text-title">{platform.name}</h2>
              <p className="text-sm text-muted">{platform.requirements}</p>
            </div>
            <p className="text-sm text-muted sm:col-start-1">{platform.note}</p>
            <ButtonLink
              variant={recommended ? "primary" : "outline"}
              className="max-sm:mt-2 sm:col-start-2 sm:row-span-2 sm:row-start-1"
              data-download={id}
              href={catalog?.installers[id].url ?? releasesUrl}
              aria-label={catalog ? `${label} — ${platform.requirements}` : undefined}
            >
              <Image src={sitePath("/assets/lumina-icon.png")} alt="" width={24} height={24} className="shrink-0" />
              <span data-download-label>{label}</span>
              <DownloadIcon />
            </ButtonLink>
          </article>
        );
      })}
      <p className="mt-6 max-w-[65ch] text-sm text-muted">
        The Mac beta uses ad hoc signing without Apple notarization. Windows has no publisher certificate. Your operating system may warn or block installation.{" "}
        <a href={sitePath("/#installation-help")}>What to expect</a>
      </p>
      <a id="release-link" className="mt-2 inline-flex min-h-11 items-center text-sm font-medium" href={catalog?.releaseUrl ?? releasesUrl}>Release notes and all downloads</a>
    </div>
  );
}
