export * from './isDev';

export function isFunction(fn: any): fn is (...args: any[]) => any {
  return typeof fn === 'function';
}
