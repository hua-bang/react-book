export * from './isDev';

export function isFunction(fn: any): fn is (...args: any[]) => any {
  return typeof fn === 'function';
}

export function isPlainObject(obj: unknown): obj is Record<string, unknown> {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  return true;
}

export const isUndef = (value: unknown): value is undefined =>
  typeof value === 'undefined';
