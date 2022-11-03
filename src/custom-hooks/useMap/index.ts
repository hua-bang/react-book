import { useState, useMemo } from 'react';

interface Actions<K, T> {
  set: (key: K, val: T) => void;
  setAll: (newMap: Iterable<readonly [K, T]>) => void;
  remove: (key: K) => void;
  reset: () => void;
  get: (key: K) => T | undefined;
}

function useMap<K, T>(initialVal?: Iterable<readonly [K, T]>) {
  const getInitialVal = () =>
    initialVal === undefined ? new Map<K, T>() : new Map(initialVal);

  const [map, setMap] = useState(() => getInitialVal());

  const actions: Actions<K, T> = useMemo(() => {
    const set = (key: K, val: T) => {
      setMap(prev => {
        const newMap = new Map(prev);
        newMap.set(key, val);
        return newMap;
      });
    };

    const setAll = (newMap: Iterable<readonly [K, T]>) => {
      setMap(new Map(newMap));
    };

    const remove = (key: K) => {
      setMap(prev => {
        const newMap = new Map(prev);
        newMap.delete(key);
        return newMap;
      });
    };

    const reset = () => {
      setMap(() => getInitialVal());
    };

    const get = (key: K) => map.get(key);

    return {
      set,
      get,
      setAll,
      remove,
      reset,
    };
  }, [initialVal]);

  return [map, actions];
}

export default useMap;
