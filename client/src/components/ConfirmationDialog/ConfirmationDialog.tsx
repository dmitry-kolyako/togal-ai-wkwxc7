import React from "react";
import {Modal} from "../Modal/Modal.tsx";
import {
    DialogActionButton,
    DialogActionsContainer,
    DialogMessage,
    DialogTitle
} from "./ConfirmationDialog.components.tsx";
import {useOnEnter, useOnEscape} from "../../hooks";

export type ConfirmationDialogProps = {
    title?: string;
    isOpen: boolean
    message: string | null;
    onConfirm: () => void;
    onCancel: () => void;

}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
                                                                          title = 'Confirm Action',
                                                                          isOpen,
                                                                          message,
                                                                          onConfirm,
                                                                          onCancel,
                                                                      }) => {

    useOnEscape(isOpen, () => onCancel())
    useOnEnter(isOpen, () => onConfirm())

    return <Modal isOpen={isOpen} onClose={onCancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogMessage>{message}</DialogMessage>
        <DialogActionsContainer>
            <DialogActionButton variant="cancel" onClick={onCancel}>
                Cancel
            </DialogActionButton>
            <DialogActionButton variant="confirm" onClick={onConfirm}>
                Confirm
            </DialogActionButton>
        </DialogActionsContainer>
    </Modal>

};

export default ConfirmationDialog;
