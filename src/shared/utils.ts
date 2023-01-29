/**
 * Sleeps for the given number of milliseconds.
 *
 * @param ms The number of milliseconds to sleep for.
 * @returns A promise that resolves after the given number of milliseconds.
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}