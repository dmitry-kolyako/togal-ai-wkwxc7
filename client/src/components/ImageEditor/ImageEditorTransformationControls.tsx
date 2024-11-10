import {useTransformationControls} from "../../hooks/useTransformationControls.ts";
import {TransformationType} from "../../entities";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog.tsx";
import {ImageActionButton} from "./ImageEditor.components.tsx";

export const ImageEditorTransformationControls = () => {
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
        <ImageActionButton disabled={!canUndo} onClick={handleUndo}>Undo</ImageActionButton>
        <ImageActionButton disabled={!canRedo} onClick={handleRedo}>Redo</ImageActionButton>

        <ImageActionButton disabled={!canTransform} onClick={() => handleTransform(TransformationType.ROTATE_LEFT)}>Rotate
            Left</ImageActionButton>
        <ImageActionButton disabled={!canTransform} onClick={() => handleTransform(TransformationType.ROTATE_RIGHT)}>Rotate
            Right</ImageActionButton>
        <ImageActionButton disabled={!canTransform} onClick={() => handleTransform(TransformationType.ZOOM_IN)}>Zoom
            In</ImageActionButton>
        <ImageActionButton disabled={!canTransform} onClick={() => handleTransform(TransformationType.ZOOM_OUT)}>Zoom
            Out</ImageActionButton>
        <ImageActionButton disabled={!canTransform}
                             onClick={() => resetTransformations()}>Reset</ImageActionButton>


        <ConfirmationDialog
            title={"Change Transformation Flow"}
            message={"Are you sure you want to reset transformation history from here?"}
            {
                ...confirmationDialog
            }
        />
    </>
}