import useStorageByType from '../useStorageState';

const useSessionStorageState = useStorageByType(sessionStorage);

export default useSessionStorageState;
