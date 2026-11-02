import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteOrigin, sitePath } from "@/lib/site";
import "./globals.css";

const geist = localFont({
  src: "../docs/assets/GeistSans.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: "Lumina | Scripture, ready for the room.",
  description: "Find a Bible passage, preview it privately, and send it to your audience. Lumina is a free desktop app for gatherings.",
  icons: { icon: { url: sitePath("/assets/lumina-icon.png"), type: "image/png" } },
};

export const viewport: Viewport = {
  themeColor: "#111922",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${geist.variable} flex min-h-svh flex-col bg-night font-sans leading-[1.55] text-night-ink`}>
        {children}
      </body>
    </html>
  );
}
