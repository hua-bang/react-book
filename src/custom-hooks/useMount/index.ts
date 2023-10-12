import { useEffect } from 'react';
import isDev from '../utils/isDev';
import { isFunction } from '@/utils';

function useMount(fn: () => void) {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(
        `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`,
      );
    }
    fn();
  }

  useEffect(() => {
    fn?.();
  }, []);
}

export default useMount;
