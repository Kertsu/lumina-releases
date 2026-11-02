# Website development

Use Node.js 24.

```sh
npm ci
npm run dev
```

Open [the local site](http://localhost:3000/lumina-releases/). `npm run lint`
checks the source. `npm run build` exports the static site to `out/`.

The release publisher still writes the installer catalog and updater feeds in
`docs/`. The Next.js build copies those files and the media assets into its
export. The existing `docs/` site remains the branch-based Pages fallback.

To publish the Next.js export after review, set **Settings → Pages → Source**
to **GitHub Actions**, then run **Deploy Lumina site to GitHub Pages** from
`main`. Subsequent site, asset, and feed changes on `main` rebuild the export.
