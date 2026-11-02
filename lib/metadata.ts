import type { Metadata } from "next";
import { sitePath } from "./site";

export function pageMetadata(
  path: "/" | "/download/" | "/support/",
  title: string,
  description = "Find a passage, preview it privately, and send it to your audience. Free desktop Bible projection for your next gathering.",
): Metadata {
  const url = sitePath(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [sitePath("/assets/walkthrough.jpg")],
    },
    twitter: { card: "summary_large_image" },
  };
}
