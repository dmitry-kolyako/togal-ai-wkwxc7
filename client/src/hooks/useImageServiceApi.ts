import {useCallback, useMemo} from "react";
import {useImageProvider} from "./useImageProvider.ts";
import {ImageModel} from "../../../shared/types/Image.ts";
import {AsyncActionKeys, TransformationHistory} from "../entities";
import {ImageActionType} from "../state";

const UploadKey = AsyncActionKeys.UPLOAD_IMAGE,
    LoadingKey = AsyncActionKeys.GET_GALLERY,
    RemoveKey = AsyncActionKeys.REMOVE_IMAGE
;

export const useImageServiceApi = () => {
    const {
        dispatch, state: {
            loading: {
                [UploadKey]: statusUpload,
                [RemoveKey]: statusRemoving,
                [LoadingKey]: statusLoading
            }
        },
        api: ApiService,
        actions: {catchError, withAsyncProgress},
    } = useImageProvider()

    const trackUpload = useMemo(() => withAsyncProgress(UploadKey), [withAsyncProgress])
    const trackRemove = useMemo(() => withAsyncProgress(RemoveKey), [withAsyncProgress])
    const trackLoadImages = useMemo(() => withAsyncProgress(LoadingKey), [withAsyncProgress])

    const removeImage = useCallback(async ({id}: ImageModel) => {
        try {
            if (!id) throw new Error('No image provided');

            await trackRemove(ApiService.removeImage(id))

            // If successful, update the gallery
            dispatch({type: ImageActionType.REMOVE_FROM_GALLERY, payload: id});
            dispatch({type: ImageActionType.SELECT_IMAGE, payload: null});

        } catch (error) {
            catchError(error)

        }
    }, [dispatch, ApiService, catchError, trackRemove])

    const uploadImage = useCallback(async (original: File, transformed: File, history: TransformationHistory = []) => {
        try {
            if (!original || !transformed) throw new Error('No file provided');

            const request = ApiService.uploadImage(original, transformed, history);
            const uploadedImage = await trackUpload(request)

            // If successful, update the gallery
            dispatch({type: ImageActionType.ADD_TO_GALLERY, payload: uploadedImage});
            dispatch({type: ImageActionType.SELECT_IMAGE, payload: null});

        } catch (error) {
            catchError(error)

        }
    }, [dispatch, ApiService, catchError, trackUpload])

    const loadImages = useCallback(async () => {
        try {
            const collection = await trackLoadImages(ApiService.loadImages())
            dispatch({type: ImageActionType.SET_GALLERY, payload: collection});
        } catch (error) {
            catchError(error)
        }
    }, [dispatch, ApiService, catchError, trackLoadImages])


    return {
        actions: {
            uploadImage, removeImage, loadImages,
        },
        state: {
            statusUpload, statusLoading, statusRemoving
        }
    }
}