import { createUseStorageState } from '../createUseStorageState';

const useSessionStorageState = createUseStorageState(() => sessionStorage);

export default useSessionStorageState;
