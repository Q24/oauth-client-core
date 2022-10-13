export function epochSeconds(): number {
  return Math.round(new Date().getTime() / 1000.0);
}
