import {useState} from "react";

type TWithOpen = {
    isOpen?: boolean,
}
export const useDialogControls = (props?: TWithOpen) => {
    const [isOpen, setDeleteDialogOpen] = useState(Boolean(props?.isOpen));
    const open = () => setDeleteDialogOpen(true);
    const close = () => setDeleteDialogOpen(false);

    return {
        isOpen,
        open,
        close
    }
}