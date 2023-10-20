import { createUseStorageState } from '../createUseStorageState';

const useLocalStorageState = createUseStorageState(() => localStorage);

export default useLocalStorageState;
