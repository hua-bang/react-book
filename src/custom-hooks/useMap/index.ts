import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

interface Actions<K, T> {
  set: (key: K, value: T) => void;
  setAll: (map: Iterable<readonly [K, T]>) => void;
  remove: (key: K) => void;
  reset: () => void;
  get: (key: K) => T | undefined;
}

function useMap<K, T>(
  initialValue?: Iterable<[K, T]>,
): [Map<K, T>, Actions<K, T>] {
  const getInitValue = () => new Map<K, T>(initialValue);

  const [map, setMap] = useState<Map<K, T>>(getInitValue);

  const set = (key: K, value: T) => {
    setMap(prev => {
      const tempMap = new Map(prev);
      tempMap.set(key, value);
      return tempMap;
    });
  };

  const setAll = (nextMap: Iterable<readonly [K, T]>) => {
    setMap(new Map(nextMap));
  };

  const remove = (key: K) => {
    setMap(prev => {
      const tempMap = new Map(prev);
      tempMap.delete(key);
      return tempMap;
    });
  };

  const reset = () => {
    setMap(getInitValue);
  };

  const get = (key: K) => {
    return map.get(key);
  };

  const actions: Actions<K, T> = {
    set: useMemoizedFn(set),
    get: useMemoizedFn(get),
    setAll: useMemoizedFn(setAll),
    remove: useMemoizedFn(remove),
    reset: useMemoizedFn(reset),
  };

  return [map, actions];
}

export default useMap;
