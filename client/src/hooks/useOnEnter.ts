import {useOnKeyDownKey} from "./useOnKey.ts";

export const useOnEnter = (isOpen: boolean, cb: () => void) => useOnKeyDownKey(isOpen, 'Enter', cb)