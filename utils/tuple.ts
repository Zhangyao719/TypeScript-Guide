export function tuple<T extends unknown[]>(...ts: T): T {
  return ts
}