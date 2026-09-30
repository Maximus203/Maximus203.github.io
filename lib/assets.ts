const configuredOrigin = process.env.NEXT_PUBLIC_ASSET_ORIGIN?.replace(/\/$/, '') ?? '';

export function assetUrl(path: string): string {
  return `${configuredOrigin}${path}`;
}
