import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/button";
import { DownloadActions, DownloadsProvider, PlatformNote } from "@/components/downloads";
import { SiteFrame } from "@/components/site-frame";
import { pageMetadata } from "@/lib/metadata";
import { installUrl, reportUrl, repository, sitePath } from "@/lib/site";

export const metadata = pageMetadata("/", "Lumina | Scripture, ready for the room.");
const walkthrough = sitePath("/assets/walkthrough.mp4");
const screenSize = { width: 2880, height: 1620 };
const audienceIcon = "M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z M12 17v4 M8 21h8";
const operatorIcon = "M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z M9 4v16 M13 9h4 M13 13h4";

const steps = [
  {
    title: "Find your passage.",
    description: "Search remembered words or enter a reference. The bundled World English Bible works offline.",
    image: "/assets/operator-search.jpg",
    alt: "Bible library search results in Lumina",
    icon: "m16 16 4.5 4.5 M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z",
  },
  {
    title: "Check it privately.",
    description: "Read the preview on your screen. The audience keeps its current view until you send the next passage.",
    image: "/assets/operator-preview.jpg",
    alt: "Private verse preview before sending to the audience",
    icon: "M2.5 12c2.2-3.5 5.6-6 9.5-6s7.3 2.5 9.5 6c-2.2 3.5-5.6 6-9.5 6s-7.3-2.5-9.5-6Z M14.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z",
  },
  {
    title: "Send it to the room.",
    description: "Open the audience window on your display and send the passage. Separate workspaces keep their own selections and audience windows.",
    image: "/assets/audience-john.jpg",
    alt: "Clean audience display of John 3:16",
    icon: audienceIcon,
  },
] as const;

function ScreenLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="size-4 text-signal">
        <path d={icon} />
      </svg>
      {label}
    </span>
  );
}

function Hero() {
  const screen = "w-full rounded-media outline-1 -outline-offset-1 outline-screen-edge";
  const caption = "flex flex-wrap gap-x-3 pt-2 text-sm";

  return (
    <section
      className="wrap grid items-center gap-6 pt-6 pb-16 sm:gap-10 sm:pt-[clamp(56px,6vw,88px)] sm:pb-[clamp(72px,7vw,104px)] min-[56rem]:grid-cols-[minmax(0,4.5fr)_minmax(0,7.5fr)]"
      aria-labelledby="hero-title"
    >
      <div>
        <h1 id="hero-title" className="text-[clamp(2.5rem,11vw,3.25rem)] sm:max-w-[12ch] sm:text-display min-[56rem]:max-w-[9ch]">
          Scripture, ready for the room.
        </h1>
        <p className="mt-4 max-w-[29ch] text-lead leading-[1.45] text-night-muted sm:mt-6">
          Free desktop Bible projection that works offline.
        </p>
        <DownloadActions className="mt-4 sm:mt-6" />
        <PlatformNote className="mt-2" />
      </div>
      <div className="product-visual grid min-w-0" data-kind="product">
        <figure className="w-full justify-self-end sm:w-[92%] min-[56rem]:w-[94%]">
          <Image
            {...screenSize}
            src={sitePath("/assets/audience-john.jpg")}
            alt="Audience view showing John 3:16 from the World English Bible"
            className={screen}
            loading="eager"
            fetchPriority="high"
          />
          <figcaption className={`${caption} justify-end text-right sm:ml-[60%]`}>
            <ScreenLabel icon={audienceIcon} label="Audience display" />
            <span className="text-night-muted">Only the passage</span>
          </figcaption>
        </figure>
        <figure className="relative z-1 mt-4 w-[77%] sm:mt-[clamp(-6rem,-7vw,-4rem)] sm:w-[59%]">
          <Image
            {...screenSize}
            src={sitePath("/assets/operator-john.jpg")}
            alt="Lumina operator workspace with Bible search, chapter thumbnails, and presentation controls"
            className={`${screen} shadow-screen`}
            loading="eager"
          />
          <figcaption className={`${caption} justify-between`}>
            <ScreenLabel icon={operatorIcon} label="Operator workspace" />
            <span className="text-night-muted">Search and preview privately</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Walkthrough() {
  return (
    <section
      className="wrap grid items-center gap-columns py-section min-[56rem]:grid-cols-[minmax(0,3fr)_minmax(0,9fr)]"
      aria-labelledby="walkthrough-title"
    >
      <div>
        <h2 id="walkthrough-title" className="min-[56rem]:max-w-[13ch]">Prepare the next passage.</h2>
        <p className="mt-4 text-lead leading-[1.45] text-muted">
          The room keeps seeing the current passage while you prepare.
        </p>
      </div>
      <figure id="walkthrough" data-kind="product">
        <video
          controls
          playsInline
          preload="none"
          poster={sitePath("/assets/walkthrough.jpg")}
          aria-label="40 second Lumina product walkthrough"
          className="aspect-video w-full rounded-media bg-night"
        >
          <source src={walkthrough} type="video/mp4" />
          <p><a href={walkthrough} className="underline">Download the Lumina walkthrough video.</a></p>
        </video>
        <figcaption className="mt-3 flex justify-between gap-4 text-sm text-muted">
          <span>40-second Lumina walkthrough</span>
          <a href={sitePath("/assets/CREDITS.txt")} className="underline">Credits</a>
        </figcaption>
      </figure>
    </section>
  );
}

function Workflow() {
  return (
    <section className="wrap pb-section" aria-labelledby="workflow-title">
      <div className="grid items-end gap-columns border-t border-rule pt-10 pb-10 sm:pt-16 min-[56rem]:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
        <h2 id="workflow-title">From search to Scripture.</h2>
        <p className="max-w-[29ch] text-lead leading-[1.45] text-muted">
          Three steps. One operator. A separate view for the room.
        </p>
      </div>
      <ol role="list" data-kind="product">
        {steps.map(({ title, description, image, alt, icon }, index) => (
          <li key={image} className="grid items-center gap-columns border-t border-rule py-6 last:border-b sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-6 gap-y-2">
              <div className="row-span-2 grid justify-items-center gap-2 text-signal-deep" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false" className="size-7">
                  <path d={icon} />
                </svg>
                <span className="text-xs tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{title}</h3>
              <p className="col-start-2 max-w-[45ch] text-muted">{description}</p>
            </div>
            <Image
              {...screenSize}
              src={sitePath(image)}
              alt={alt}
              className="w-full rounded-media outline-1 -outline-offset-1 outline-rule"
            />
          </li>
        ))}
      </ol>
    </section>
  );
}

function Question({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group border-b border-rule">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-[550] hover:text-signal-deep [&::-webkit-details-marker]:hidden">
        {title}
        <svg viewBox="0 0 24 24" aria-hidden="true" className="group-open:rotate-45">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </summary>
      <div className="space-y-3 pr-6 pb-6 text-muted [&_a]:inline-block [&_a]:underline [&_strong]:font-[550]">
        {children}
      </div>
    </details>
  );
}

function InstallationHelp() {
  return (
    <section
      className="wrap grid items-start gap-columns pb-section min-[56rem]:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"
      id="installation-help"
      aria-labelledby="help-title"
    >
      <div>
        <h2 id="help-title">Before you install.</h2>
        <p className="mt-4 max-w-[45ch] text-muted">
          This beta has limited platform testing. Your reports help us understand how it works on more setups.
        </p>
        <a href={reportUrl} className="mt-2 inline-flex min-h-11 items-center text-sm font-[550] underline">
          Report a problem
        </a>
      </div>
      <div className="border-t border-rule">
        <Question title="Why does my Mac or PC show a warning?">
          <p>The initial beta has no Apple notarization or Windows publisher signing. Only continue if you trust the download.</p>
          <p>
            On macOS, dismiss the warning, then check <strong>System Settings → Privacy &amp; Security → Open Anyway</strong>.
            On Windows, inspect SmartScreen’s details. Some systems offer <strong>More info → Run anyway</strong>.
            Organization policies may prevent these options.
          </p>
          <p>
            An exception lets the app run. It does not establish software safety.{" "}
            <a href={installUrl}>Full installation instructions</a>
          </p>
        </Question>
        <Question title="Can I use Lumina without internet?">
          <p>Yes. The bundled World English Bible, local workspaces, search, and audience projection work offline. Downloading the app and checking for updates require internet.</p>
        </Question>
        <Question title="How do updates work?">
          <p>
            Lumina checks quietly when online. A dot on the Lumina menu means an update is available.
            Open the menu, choose <strong>Update available</strong>, and review it. You choose when to install and restart.
          </p>
          <p>Installation can close audience windows. Updates are intended to retain your workspaces and library. Beta users will receive the eventual stable release.</p>
        </Question>
        <Question title="Is Lumina free? Can I share it?">
          <p>
            Yes. Personal, organizational, and commercial use is free. You may share original, unmodified installers with their notices.
            Lumina’s source is private. Distributing modified or rebranded app builds requires permission.
          </p>
          <p>
            Your settings and presentation content are ordinary app use. Third-party components retain their own rights.{" "}
            <a href={`${repository}/blob/main/LICENSE`}>Read the application terms</a>
          </p>
        </Question>
        <Question title="What do I need on Linux?">
          <p>
            The initial package is an x64 AppImage. Make it executable, then open it. Runtime and FUSE requirements vary by distribution.
            Linux runtime support remains experimental. Keep the file somewhere writable if you plan to use the updater.
          </p>
        </Question>
        <Question title="Where does my data go?">
          <p>
            Your Bible library, workspaces, and settings are stored on your computer. Online update checks contact GitHub.
            Bug reports are optional and public, so remove private content before attaching screenshots or logs.
          </p>
          <p><a href={`${repository}/blob/main/PRIVACY.md`}>Privacy information</a></p>
        </Question>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <SiteFrame page="home">
      <main id="main">
        <DownloadsProvider>
          <Hero />
          <div className="paper-surface">
            <Walkthrough />
            <Workflow />
            <InstallationHelp />
          </div>
          <section className="wrap grid items-center gap-columns py-section min-[56rem]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div>
              <h2 className="max-w-[15ch]">Bring Scripture to the room.</h2>
              <p className="mt-4 text-lead leading-[1.45] text-night-muted">
                Try the free beta with your own setup.
              </p>
            </div>
            <DownloadActions />
          </section>
          <section
            className="wrap grid items-end gap-columns border-y border-night-rule pt-10 pb-16 sm:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
            id="coffee"
            aria-labelledby="coffee-title"
          >
            <h2 id="coffee-title" className="text-[clamp(2rem,3.1vw,2.875rem)]">
              I turn caffeine<br />into software.
            </h2>
            <div>
              <p className="text-night-muted">
                If Lumina comes in handy, you can buy me a coffee. Lumina is free either way.
              </p>
              <ButtonLink href={sitePath("/support/")} variant="outline" className="mt-4">
                Buy me a coffee
              </ButtonLink>
            </div>
          </section>
        </DownloadsProvider>
      </main>
    </SiteFrame>
  );
}
