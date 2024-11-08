import {useImageContext} from "./useImageContext.ts";
import {useCallback} from "react";
import {ImageActionType} from "../state/state.ts";
import {ImageEntity, Transformation} from "../entities";

export const useImageControls = () => {
    const {
        dispatch,
        state: {transformedImage, selectedImage, transformationHistory}
    } = useImageContext();

    const setTransformedImage = useCallback((payload: File | null) => {
        dispatch({type: ImageActionType.SET_TRANSFORMED_IMAGE, payload});
    }, [dispatch])

    const setSelectedImage = useCallback((payload: ImageEntity | null) => {
        dispatch({type: ImageActionType.SELECT_IMAGE, payload});
    }, [dispatch])

    const addTransformation = useCallback((payload: Transformation) => {
        dispatch({type: ImageActionType.ADD_TRANSFORMATION, payload});
    }, [dispatch])

    const resetTransformations = useCallback(() => {
        dispatch({type: ImageActionType.RESET_TRANSFORMATIONS});
    }, [dispatch])

    return {
        dispatch,
        setSelectedImage, selectedImage,
        transformedImage, setTransformedImage,
        transformationHistory,
        addTransformation, resetTransformations
    }

}