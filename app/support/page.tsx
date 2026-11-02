import Image from "next/image";
import { ButtonLink, DownloadIcon } from "@/components/button";
import { SiteFrame } from "@/components/site-frame";
import { pageMetadata } from "@/lib/metadata";
import { sitePath } from "@/lib/site";

export const metadata = pageMetadata(
  "/support/",
  "Buy me a coffee | Lumina",
  "Enjoying Lumina? Buy the maker a coffee through GCash, GoTyme, or MariBank. Always optional. Lumina is free either way.",
);

// Crop each provider's image for scanning. The open and save links use the original.
const providers = [
  {
    id: "gcash",
    name: "GCash",
    recipient: "Ku**d Da***l B.",
    note: "Recipient on the QR",
    width: 720,
    height: 1420,
    crop: "-left-1/2 top-[-112.5%] w-[200%]",
  },
  {
    id: "gotyme",
    name: "GoTyme",
    recipient: "Kurtd Bigtas",
    note: "Account ending in 9457",
    width: 592,
    height: 867,
    crop: "left-[-13.4904%] top-[-64.0257%] w-[126.7666%]",
  },
  {
    id: "maribank",
    name: "MariBank",
    recipient: "Kurtd Daniel B.",
    note: "Account ending in 3442",
    width: 720,
    height: 1143,
    crop: "left-[-27.5862%] top-[-38.7931%] w-[155.1724%]",
  },
];

function PaymentOption({ provider }: { provider: (typeof providers)[number] }) {
  const { id, name, recipient, note, width, height, crop } = provider;
  const image = sitePath(`/assets/support/${id}.png`);

  return (
    <article
      aria-labelledby={`${id}-title`}
      className="support-card grid content-start justify-items-center gap-4 border-t border-rule py-6 text-center sm:border-b"
    >
      <h2 id={`${id}-title`} className="text-title">
        {name}
      </h2>
      <a
        href={image}
        target="_blank"
        rel="noopener"
        aria-label={`Open full size ${name} receiving QR`}
        className="qr-display relative block aspect-square w-full max-w-[280px] overflow-clip bg-white"
      >
        <Image
          src={image}
          alt={`${name} receiving QR for ${recipient}`}
          width={width}
          height={height}
          className={`absolute h-auto max-w-none ${crop}`}
        />
      </a>
      <div>
        <p>{recipient}</p>
        <p className="mt-2 text-sm text-muted">{note}</p>
      </div>
      <ButtonLink href={image} download={`lumina-${id}-qr.png`} variant="outline" className="support-save">
        Save {name} QR
        <DownloadIcon />
      </ButtonLink>
    </article>
  );
}

export default function SupportPage() {
  return (
    <SiteFrame page="support">
      <main id="main" className="paper-surface pt-6 pb-section sm:pt-10">
        <div className="wrap">
          <section aria-labelledby="support-title">
            <a
              href={sitePath("/")}
              className="mb-6 inline-flex min-h-11 items-center text-sm font-[550] underline"
            >
              Back to Lumina
            </a>
            <div className="grid items-end gap-columns min-[56rem]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
              <h1 id="support-title" className="text-section">
                I turn caffeine
                <br />
                into software.
              </h1>
              <div>
                <p>I’m Kurtd. If Lumina helps, you can buy me a coffee.</p>
                <p className="mt-2 text-sm text-muted">
                  Always optional. Lumina is free either way.
                </p>
              </div>
            </div>
          </section>
          <div className="mt-10 grid gap-columns sm:grid-cols-3">
            {providers.map((provider) => (
              <PaymentOption key={provider.id} provider={provider} />
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Thanks for trying Lumina, sharing it, reporting a bug, or sending a
            coffee. It all means a lot.
          </p>
        </div>
      </main>
    </SiteFrame>
  );
}
