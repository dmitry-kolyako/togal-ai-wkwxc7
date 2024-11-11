// Modal.tsx
import {FC, ReactNode, useCallback} from 'react';
import {Backdrop, ModalContainer} from "./Modal.components.tsx";

type ModalProps = {
    isOpen: boolean;
    onClose?: () => void;
    children: ReactNode;
}

export const Modal: FC<ModalProps> = ({isOpen, onClose, children}) => {
    const handleClick = useCallback(() => onClose && onClose(), [onClose])
    if (!isOpen) return null;

    return (
        <>
            <Backdrop isOpen={isOpen} onClick={handleClick}/>
            <ModalContainer>
                {children}
            </ModalContainer>
        </>
    );
};