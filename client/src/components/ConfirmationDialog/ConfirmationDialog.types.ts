export type ConfirmationDialogProps = {
    title?: string;
    isOpen: boolean
    message: string | null;
    onConfirm: () => void;
    onCancel: () => void;

}

export type TWithConfirmationDialog = {
    confirmationDialog: ConfirmationDialogProps
}