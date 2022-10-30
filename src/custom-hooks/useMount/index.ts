import { useEffect, EffectCallback } from 'react';

const useMount = (fn: EffectCallback) => {
  useEffect(fn, []);
};

export default useMount;
