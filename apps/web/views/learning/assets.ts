const base = (process.env.NEXT_PUBLIC_ASSETS_BASE_URL ?? '').replace(/\/$/, '');

export const asset = (path: string) => `${base}${path}`;
