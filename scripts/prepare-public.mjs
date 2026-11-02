import { copyFile, cp, mkdir, rm, stat } from "node:fs/promises";

const docs = new URL("../docs/", import.meta.url);
const publicDir = new URL("../public/", import.meta.url);
await mkdir(publicDir, { recursive: true });

// The release publisher owns these paths in docs/. Copy the bytes for Next's export.
for (const directory of ["assets", "updates"]) {
  const source = new URL(directory, docs);
  const destination = new URL(directory, publicDir);
  await rm(destination, { recursive: true, force: true });

  // Updater feeds are added when the first release is published.
  if (directory === "updates") {
    const published = await stat(source).catch((error) => {
      if (error.code !== "ENOENT") throw error;
      return null;
    });
    if (!published) continue;
  }

  await cp(source, destination, { recursive: true });
}

await copyFile(new URL("downloads.json", docs), new URL("downloads.json", publicDir));
await copyFile(new URL(".nojekyll", docs), new URL(".nojekyll", publicDir));
