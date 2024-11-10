export type ConfirmationDialogProps = {
    title?: string;
    isOpen: boolean
    message: string;
    onConfirm: () => void;
    onCancel: () => void;

}

export type TWithConfirmationDialog = {
    confirmationDialog: ConfirmationDialogProps
}