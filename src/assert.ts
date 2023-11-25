/** Assert that a given expression is true. */
export function assert(expr: unknown, msg?: string): asserts expr {
  if (!expr) {
    throw new Error(msg || "assertion failed");
  }
}

/** Assert that x is never (aka this can't happen!) */
export function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}
