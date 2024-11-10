import {useImageProvider} from "./useImageProvider.ts";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Transformation, TransformationType} from "../entities";
import {ImageActionType} from "../state";
import {useDialogControls} from "../components/ConfirmationDialog/useDialogControls.ts";

export const useTransformationControls = () => {
    const {
        dispatch,
        actions: {catchError},
        state: {transformedImage, selectedImage, transformationHistory, selectedTransformation},
    } = useImageProvider();

    const applyTransformation = (transformation: Transformation) => {
        try {
            // Simulate applying a transformation (e.g., rotate, zoom)
            if (!selectedImage) throw new Error('No image selected for transformation');

            // Apply transformation logic (just an example, could modify the image state)
            dispatch({type: ImageActionType.ADD_TRANSFORMATION, payload: transformation});

        } catch (error) {
            catchError(error)

        }
    };

    const addTransformation = useCallback((payload: Transformation) => {
        dispatch({type: ImageActionType.ADD_TRANSFORMATION, payload});
    }, [dispatch])

    const resetTransformations = useCallback((payload: Transformation[] = []) => {
        dispatch({type: ImageActionType.RESET_TRANSFORMATIONS, payload});
    }, [dispatch])

    const setSelectedTransformation = useCallback((payload: number) => {
        dispatch({type: ImageActionType.SELECT_TRANSFORMATION, payload});
    }, [dispatch])

    const [transformationItem, prepareTransformation] = useState<null | Transformation>(null);
    const dialog = useDialogControls()

    const handleCancelTransformation = () => {
        prepareTransformation(null)
        dialog.close()
    };
    const handleApplyTransformation = useCallback(() => {
        addTransformation(transformationItem)
        prepareTransformation(null)
    }, [addTransformation, transformationItem, prepareTransformation])


    const handleConfirmTransformation = () => {
        resetTransformations(
            transformationHistory.slice(0, selectedTransformation + 1)
        )
        handleApplyTransformation()
        dialog.close()
    };

    const needConfirmTransformation = useMemo(() => (
        transformationItem &&
        transformationHistory.length && (selectedTransformation + 1 !== transformationHistory.length)

    ), [
        transformationItem, selectedTransformation, transformationHistory
    ])

    useEffect(() => {
        if (needConfirmTransformation) {
            dialog.open()
        } else if (transformationItem) {
            handleApplyTransformation()
        }
    }, [transformationItem, handleApplyTransformation, needConfirmTransformation, dialog]);

    const handleTransform = useCallback((type: TransformationType) => {
        prepareTransformation({type});
    }, [prepareTransformation]);

    const handleUndo = useCallback(() => {
        setSelectedTransformation(selectedTransformation - 1)
    }, [setSelectedTransformation, selectedTransformation])

    const handleRedo = useCallback(() => {
        setSelectedTransformation(selectedTransformation - 1)
    }, [setSelectedTransformation, selectedTransformation])

    const {canTransform, canRedo, canUndo} = useMemo(() => ({
        canRedo: selectedTransformation + 1 < transformationHistory.length,
        canUndo: transformationHistory.length && selectedTransformation > -1,
        canTransform: Boolean(transformedImage)
    }), [selectedTransformation, transformationHistory, transformedImage])


    return {
        state: {
            transformedImage, needConfirmTransformation,
            transformationHistory, selectedTransformation,

            canRedo, canUndo, canTransform,

            confirmationDialog: {
                isOpen: dialog.isOpen,
                onConfirm: handleConfirmTransformation,
                onCancel: handleCancelTransformation
            },
        },
        actions: {
            addTransformation, resetTransformations, setSelectedTransformation,
            handleTransform, applyTransformation,
            handleRedo, handleUndo
        }
    }


}