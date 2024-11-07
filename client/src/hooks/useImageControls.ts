import {useImageContext} from "./useImageContext.ts";
import {useCallback} from "react";
import {ImageActionType} from "../state/state.ts";
import {Transformation} from "../entities";

export const useImageControls = () => {
    const {dispatch, state: { transformedImage }} = useImageContext();

    const selectTransformedImage = useCallback((selectedImage: File | null) => {
        dispatch({type: ImageActionType.SET_TRANSFORMED_IMAGE, payload: selectedImage});

    }, [dispatch])

    const addTransformation = (transformation: Transformation) => {
        // handle transformation, update image transformed, track history
        // dispatch({type: ImageActionType.SET_TRANSFORMED, payload: type});
        dispatch({type: ImageActionType.ADD_TRANSFORMATION, payload: transformation});
    };

    const resetTransformations = () => {
        // handle transformation, update image transformed, track history
        // dispatch({type: ImageActionType.SET_TRANSFORMED, payload: type});
        dispatch({type: ImageActionType.RESET_TRANSFORMATIONS });
    };

    return {
        dispatch,
        transformedImage, selectTransformedImage,
        addTransformation, resetTransformations
    }

}