import {useImageControls, useOnKeyDownKey} from "../../hooks";
import {useMemo} from "react";
import {useDialogControls} from "../ConfirmationDialog/useDialogControls.ts";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog.tsx";
import {ImageActionButton} from "./ImageEditor.components.tsx";

export const ImageEditorFileControls = () => {
    const {
        actions: {handleRemove, handleSave},
        state: {selectedImage, transformedImage}
    } = useImageControls()

    const canSave = useMemo(() => (Boolean(transformedImage)), [transformedImage])
    const canDelete = useMemo(() => (Boolean(selectedImage?.id)), [selectedImage])

    const dialogDelete = useDialogControls()
    const handleDelete = () => dialogDelete.open();

    const handleCancelDelete = () => dialogDelete.close();
    const handleConfirmDelete = () => {
        handleRemove()
        dialogDelete.close();
    };

    useOnKeyDownKey(canDelete, 'Delete', handleDelete)

    return <>
        <ImageActionButton disabled={!canSave} onClick={handleSave}>Save</ImageActionButton>
        <ImageActionButton disabled={!canDelete} onClick={handleDelete}>Delete</ImageActionButton>

        <ConfirmationDialog
            isOpen={dialogDelete.isOpen}
            title={"Delete Saved Image"}
            message={"Are you sure you want to delete saved image?"}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
        />
    </>
}