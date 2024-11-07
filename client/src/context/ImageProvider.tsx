import {FC, PropsWithChildren, useCallback, useReducer} from "react";
import {ImageContext} from "./ImageContext";
import {ImageActionType, imageReducer, ImageState, initialState} from "../state/state.ts";
import {Transformation} from "../entities";

export const ImageProvider: FC<PropsWithChildren> = ({children}) => {
    const [state, dispatch] = useReducer(imageReducer, initialState);

    // Example of a function that could throw an error
    const setLoading = (payload: ImageState["loading"]) => {
        dispatch({type: ImageActionType.SET_LOADING, payload});
    }

    const showError = useCallback((message: string) => {
        dispatch({type: ImageActionType.SET_ERROR, payload: message});
    }, [dispatch])

    const clearError = () => {
        dispatch({type: ImageActionType.SET_ERROR, payload: null});
    }

    const catchError = useCallback((error: unknown) => {
        if (error instanceof Error) showError(error.message);
    }, [showError])

    const uploadImage = useCallback(async (blob: Blob) => {
        try {
            // Simulate an image upload process (e.g., API call)
            if (!blob) throw new Error('No file provided');

            // Simulate successful upload logic here
            const id = (new Date()).toISOString();
            const uploadedImage = {id, url: '', blob}; // Example uploaded image

            // If successful, update the gallery
            dispatch({type: ImageActionType.ADD_TO_GALLERY, payload: uploadedImage});
            dispatch({type: ImageActionType.SELECT_IMAGE, payload: null});

        } catch (error) {
            catchError(error)

        }
    }, [dispatch, catchError])

    // Another example function (applying transformation)
    const applyTransformation = (transformation: Transformation) => {
        try {
            // Simulate applying a transformation (e.g., rotate, zoom)
            if (!state.selectedImage) throw new Error('No image selected for transformation');

            // Apply transformation logic (just an example, could modify the image state)
            dispatch({type: ImageActionType.ADD_TRANSFORMATION, payload: transformation});

        } catch (error) {
            catchError(error)

        }
    };

    const api = {
        applyTransformation, uploadImage,
        catchError, showError, clearError,
        setLoading
    }

    return (
        <ImageContext.Provider value={{state, dispatch, api}}>
            {children}
        </ImageContext.Provider>
    );

}


