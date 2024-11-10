import React, {useMemo} from 'react';
import {TransformationType} from "../../entities";
import {ControlButton, ControlPanel} from "./TransformationControls.components.tsx";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog.tsx";
import {useDialogControls} from "../ConfirmationDialog/useDialogControls.ts";
import {useTransformationControls} from "../../hooks/useTransformationControls.ts";
import {useImageControls} from "../../hooks";

export const TransformationControls: React.FC = () => {
    return (
        <div>

            <h2>Modify image</h2>

            <ControlPanel>
                <ControlTransformations/>
                <ControlTransformedImage/>
            </ControlPanel>
        </div>

    );
};

const ControlTransformedImage = () => {
    const {
        actions: {handleRemove, handleSave},
        state: {selectedImage, transformedImage}
    } = useImageControls()

    const canSave = useMemo(() => (Boolean(transformedImage)), [transformedImage])
    const canDelete = useMemo(() => (Boolean(selectedImage?.id)), [selectedImage])

    const dialogDelete = useDialogControls()
    const handleCancelDelete = () => dialogDelete.close();
    const handleConfirmDelete = () => {
        handleRemove()
        dialogDelete.close();
    };

    return <>
        <ControlButton disabled={!canSave} onClick={handleSave}>Save</ControlButton>
        <ControlButton disabled={!canDelete} onClick={
            () => dialogDelete.open()
        }>Delete</ControlButton>

        <ConfirmationDialog
            isOpen={dialogDelete.isOpen}
            title={"Delete Saved Image"}
            message={"Are you sure you want to delete saved image?"}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
        />
    </>
}

const ControlTransformations = () => {
    const {
        actions: {
            resetTransformations,
            handleTransform, handleRedo, handleUndo
        },
        state: {
            canTransform, confirmationDialog,
            canRedo, canUndo
        }
    } = useTransformationControls()


    return <>
        <ControlButton disabled={!canUndo} onClick={handleUndo}>Undo</ControlButton>
        <ControlButton disabled={!canRedo} onClick={handleRedo}>Redo</ControlButton>

        <ControlButton disabled={!canTransform} onClick={() => handleTransform(TransformationType.ROTATE_LEFT)}>Rotate
            Left</ControlButton>
        <ControlButton disabled={!canTransform} onClick={() => handleTransform(TransformationType.ROTATE_RIGHT)}>Rotate
            Right</ControlButton>
        <ControlButton disabled={!canTransform} onClick={() => handleTransform(TransformationType.ZOOM_IN)}>Zoom
            In</ControlButton>
        <ControlButton disabled={!canTransform} onClick={() => handleTransform(TransformationType.ZOOM_OUT)}>Zoom
            Out</ControlButton>
        <ControlButton disabled={!canTransform}
                       onClick={() => resetTransformations()}>Reset</ControlButton>


        <ConfirmationDialog
            title={"Change Transformation Flow"}
            message={"Are you sure you want to reset transformation history from here?"}
            {
                ...confirmationDialog
            }
        />
    </>
}