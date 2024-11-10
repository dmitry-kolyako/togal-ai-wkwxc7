import {useTransformationControls} from "../../hooks/useTransformationControls.ts";
import {TransformationType} from "../../entities";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog.tsx";
import {ImageActionsContainer} from "./ImageEditor.components.tsx";
import {ButtonWithIcon} from "../Shared";
import {ClearHistoryIcon, RedoIcon, RotateLeft, RotateRight, UndoIcon, ZoomIn, ZoomOut} from "../Icons/Icons.tsx";

export const ImageEditorTransformationControls = () => {
    const {
        actions: {
            handleTransform, handleRedo, handleUndo
        },
        state: {
            canTransform, canReset,
            confirmationChangeDialog,
            confirmationResetDialog,
            canRedo, canUndo
        }
    } = useTransformationControls()

    return <ImageActionsContainer>
        <ButtonWithIcon
            icon={<UndoIcon/>}
            disabled={!canUndo} onClick={handleUndo}>Undo</ButtonWithIcon>
        <ButtonWithIcon
            icon={<RedoIcon/>}
            disabled={!canRedo} onClick={handleRedo}>Redo</ButtonWithIcon>

        <ButtonWithIcon
            icon={<RotateLeft/>}
            disabled={!canTransform}
            onClick={() => handleTransform(TransformationType.ROTATE_LEFT)}>Rotate Left</ButtonWithIcon>
        <ButtonWithIcon
            icon={<RotateRight/>}
            disabled={!canTransform}
            onClick={() => handleTransform(TransformationType.ROTATE_RIGHT)}>Rotate Right</ButtonWithIcon>
        <ButtonWithIcon
            icon={<ZoomIn/>}
            disabled={!canTransform}
            onClick={() => handleTransform(TransformationType.ZOOM_IN)}>Zoom In</ButtonWithIcon>
        <ButtonWithIcon
            icon={<ZoomOut/>}
            disabled={!canTransform}
            onClick={() => handleTransform(TransformationType.ZOOM_OUT)}>Zoom Out</ButtonWithIcon>
        <ButtonWithIcon
            icon={<ClearHistoryIcon/>}
            disabled={!canReset}
            onClick={() => confirmationResetDialog.open()}>Reset</ButtonWithIcon>

        <ConfirmationDialog
            title={"Change Transformation Flow"}
            message={"Are you sure you want to reset transformation history from here?"}
            {
                ...confirmationChangeDialog
            }
        />
        <ConfirmationDialog
            title={"Reset Transformation Flow"}
            message={"Are you sure to reset transformations?"}
            {
                ...confirmationResetDialog
            }
        />
    </ImageActionsContainer>
}