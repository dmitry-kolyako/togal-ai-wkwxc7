import {useImageControls, useOnKeyDownKey} from "../../hooks";
import {useMemo} from "react";
import {useDialogControls} from "../ConfirmationDialog/useDialogControls.ts";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog.tsx";
import {ButtonWithIcon} from "../Shared";
import {DeleteIcon, DownloadIcon, SaveIcon} from "../Icons/Icons.tsx";
import {ImageActionsContainer} from "./ImageEditor.components.tsx";

export const ImageEditorFileControls = () => {
    const {
        actions: {handleRemove, handleSave, handleDownload},
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

    return <ImageActionsContainer>

        <ButtonWithIcon
            disabled={!canDelete}
            icon={<DeleteIcon/>}
            onClick={handleDelete}
            ariaLabel="Delete"
        >Delete</ButtonWithIcon>

        <ButtonWithIcon
            disabled={!canSave}
            icon={<SaveIcon/>}
            onClick={handleSave}
            ariaLabel="Save"
        >Save</ButtonWithIcon>

        <ButtonWithIcon
            disabled={!canSave}
            icon={<DownloadIcon/>}
            onClick={handleDownload}
            ariaLabel="Download"
        >Download</ButtonWithIcon>

        <ConfirmationDialog
            isOpen={dialogDelete.isOpen}
            title={"Delete Saved Image"}
            message={"Are you sure you want to delete saved image?"}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
        />
    </ImageActionsContainer>
}