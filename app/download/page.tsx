import {
  DownloadsProvider,
  InstallerList,
  ReleaseStatus,
} from "@/components/downloads";
import { SiteFrame } from "@/components/site-frame";
import { pageMetadata } from "@/lib/metadata";
import { installUrl, sitePath } from "@/lib/site";

export const metadata = pageMetadata("/download/", "Download Lumina for macOS, Windows & Linux");

export default function DownloadPage() {
  return (
    <SiteFrame page="download">
      <main id="main" className="paper-surface pt-6 pb-section sm:pt-16">
        <section
          id="downloads"
          aria-labelledby="downloads-title"
          className="wrap grid items-start gap-columns min-[56rem]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
        >
          <DownloadsProvider>
            <div>
              <nav aria-label="Back navigation">
                <a
                  href={sitePath("/")}
                  className="mb-6 inline-flex min-h-11 items-center text-sm font-[550] underline"
                >
                  Back to Lumina
                </a>
              </nav>
              <h1
                id="downloads-title"
                className="text-display min-[56rem]:max-w-[9ch]"
              >
                Download Lumina
              </h1>
              <div className="mt-6">
                <ReleaseStatus />
              </div>
              <p className="mt-6 max-w-[36ch] text-muted">
                Before using Lumina at a gathering, rehearse with your actual
                displays and keep backups of important data.
              </p>
              <a
                href={installUrl}
                className="mt-2 inline-flex min-h-11 items-center text-sm font-[550] underline"
              >
                Read the installation guide
              </a>
            </div>
            <div className="min-w-0 min-[56rem]:mt-6">
              <InstallerList />
            </div>
          </DownloadsProvider>
        </section>
      </main>
    </SiteFrame>
  );
}
