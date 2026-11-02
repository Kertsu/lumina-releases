import { releasesUrl } from "./site";

export const installers = {
  "macos-universal": {
    name: "macOS",
    anchor: "macos",
    requirements: "macOS 13.3+ on Apple Silicon and Intel",
    note: "Universal DMG. Experimental beta.",
    label: "Download .dmg",
  },
  "windows-x64": {
    name: "Windows",
    anchor: "windows",
    requirements: "EXE installer for x64",
    note: "Installer build verified. Runtime experimental.",
    label: "Download .exe",
  },
  "linux-x64": {
    name: "Linux",
    anchor: "linux",
    requirements: "AppImage for x64",
    note: "Installer build verified. Runtime experimental.",
    label: "Download AppImage",
  },
} as const;

export type InstallerId = keyof typeof installers;
export const installerIds = Object.keys(installers) as InstallerId[];

export type DownloadCatalog = {
  version: string;
  releaseUrl: string;
  installers: Record<InstallerId, { filename: string; url: string }>;
};

export function validDownloads(value: unknown): value is DownloadCatalog {
  if (!value || typeof value !== "object") return false;

  const catalog = value as Partial<DownloadCatalog>;
  if (typeof catalog.version !== "string" || !/^\d+\.\d+\.\d+(?:-beta\.\d+)?$/.test(catalog.version)) {
    return false;
  }

  const tag = `v${catalog.version}`;
  return catalog.releaseUrl === `${releasesUrl}/tag/${tag}` && installerIds.every((id) => {
    const installer = catalog.installers?.[id];
    return typeof installer?.filename === "string"
      && /^Lumina_[a-zA-Z0-9_.-]+$/.test(installer.filename)
      && installer.url === `${releasesUrl}/download/${tag}/${installer.filename}`;
  });
}

export function suggestedPlatform({ userAgent, maxTouchPoints }: Pick<Navigator, "userAgent" | "maxTouchPoints">): InstallerId | null {
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(userAgent) || (/Macintosh/i.test(userAgent) && maxTouchPoints > 1)) {
    return null;
  }
  if (/Macintosh|Mac OS X/i.test(userAgent)) return "macos-universal";
  if (/Windows/i.test(userAgent)) return "windows-x64";
  if (/Linux/i.test(userAgent) && !/aarch64|armv[5-9]/i.test(userAgent)) return "linux-x64";
  return null;
}
