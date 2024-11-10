import {useOnKeyDownKey} from "./useOnKey.ts";

export const useOnEscape = (isOpen: boolean, cb: () => void) => useOnKeyDownKey(isOpen, 'Escape', cb)