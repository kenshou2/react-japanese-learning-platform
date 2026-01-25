export const simulateDelay = <T>(result: T, base = 400, jitter = 200): Promise<T> => {
  const ms = base + Math.random() * jitter;
  return new Promise(resolve => setTimeout(() => resolve(result), ms));
};
