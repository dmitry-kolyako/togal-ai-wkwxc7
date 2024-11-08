import {FC, PropsWithChildren, useCallback, useMemo, useReducer} from "react";
import {ImageContext} from "./ImageContext";
import {ImageActionType, imageReducer, initialState} from "../state/state.ts";
import {AsyncAction, AsyncStatus, Transformation} from "../entities";
import {ApiServiceV1} from "../services/ApiService.ts";

type Prors = {
    ApiService: ApiServiceV1
};
export const ImageProvider: FC<PropsWithChildren<Prors>> = ({children, ApiService}) => {
    const [state, dispatch] = useReducer(imageReducer, initialState);


    const setLoading = useCallback((payload: AsyncAction) => {
        dispatch({type: ImageActionType.SET_LOADING, payload});
    }, [dispatch])

    const setError = useCallback((message: string | null) => {
        dispatch({type: ImageActionType.SET_ERROR, payload: message});
    }, [dispatch])

    const clearError = () => {
        dispatch({type: ImageActionType.SET_ERROR, payload: null});
    }

    const catchError = useCallback((error: unknown) => {
        if (error instanceof Error) setError(error.message);
    }, [setError])

    const withLoading = useCallback((action: string) => function <T>(promise: Promise<T>): Promise<T> {
        setLoading({action, status: AsyncStatus.PROGRESS})
        setError(null)
        return promise
            .then(
                result => {
                    setLoading({action, status: AsyncStatus.SUCCESS})
                    return result
                },
                error => {
                    setLoading({action, status: AsyncStatus.ERROR})
                    catchError(error)
                    throw error
                }
            )

    }, [setLoading, catchError, setError])

    const trackUpload = useMemo(() => withLoading('uploadImage'), [withLoading])
    const trackLoadImages = useMemo(() => withLoading('loadImages'), [withLoading])

    const uploadImage = useCallback(async (file: File) => {
        try {
            if (!file) throw new Error('No file provided');

            const uploadedImage = await trackUpload(ApiService.uploadImage(file))

            // If successful, update the gallery
            dispatch({type: ImageActionType.ADD_TO_GALLERY, payload: uploadedImage});
            dispatch({type: ImageActionType.SELECT_IMAGE, payload: null});

        } catch (error) {
            catchError(error)

        }
    }, [dispatch, catchError, trackUpload])

    const loadImages = useCallback(async () => {
        try {
            const collection = await trackLoadImages(ApiService.loadImages())
            dispatch({type: ImageActionType.SET_GALLERY, payload: collection});
        } catch (error) {
            catchError(error)
        }
    }, [dispatch, catchError, trackLoadImages])

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
        loadImages,
        applyTransformation, uploadImage,
        catchError, setError, clearError,
        withLoading
    }

    return (
        <ImageContext.Provider value={{state, dispatch, api}}>
            {children}
        </ImageContext.Provider>
    );

}


