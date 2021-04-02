export function isBrowser() {
  return !!(process as any).browser;
}

export function isServer() {
  return !(process as any).browser;
}
