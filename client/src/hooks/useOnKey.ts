import {useEffect} from "react";


export const useOnKeyDownKey = (isOpen: boolean, EventKey: string, onEvent: () => void) => {
    useEffect(() => {

        const handleKeyDown = (event: KeyboardEvent) => {
            if (onEvent && event.key === EventKey) {
                event.stopPropagation();
                event.preventDefault();
                onEvent();
            }
        };

        if (isOpen) {

            document.addEventListener('keydown', handleKeyDown);

        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onEvent, EventKey, isOpen]);
}