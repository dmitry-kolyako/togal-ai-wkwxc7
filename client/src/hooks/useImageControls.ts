import {useImageContext} from "./useImageContext.ts";
import {useCallback} from "react";
import {ImageActionType} from "../state/state.ts";
import {ImageModel, Transformation} from "../entities";

export const useImageControls = () => {
    const {
        dispatch,
        state: {transformedImage, selectedImage, transformationHistory}
    } = useImageContext();


    const setTransformedImage = useCallback((payload: Blob | null) => {
        dispatch({type: ImageActionType.SET_TRANSFORMED_IMAGE, payload});
    }, [dispatch])

    const selectImage = useCallback((payload: ImageModel | null) => {
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
        selectImage, selectedImage,
        transformedImage, setTransformedImage,
        transformationHistory,
        addTransformation, resetTransformations
    }

}