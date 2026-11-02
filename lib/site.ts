export const basePath = "/lumina-releases";
export const siteOrigin = "https://kertsu.github.io";
export const repository = "https://github.com/Kertsu/lumina-releases";

export const guideUrl = `${repository}/blob/main/GUIDE.md`;
export const installUrl = `${repository}/blob/main/INSTALL.md`;
export const reportUrl = `${repository}/issues/new/choose`;
export const releasesUrl = `${repository}/releases`;

export function sitePath(path: `/${string}`) {
  return `${basePath}${path}`;
}
