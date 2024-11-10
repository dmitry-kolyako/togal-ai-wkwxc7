import {useImageProvider} from "./useImageProvider.ts";
import {useCallback} from "react";
import {ImageEntity} from "../entities";
import {ImageActionType} from "../state";
import {useImageServiceApi} from "./useImageServiceApi.ts";
import {useImagePreviewSource} from "../components/ImageTransformer/useImagePreviewSource.ts";

export const useImageControls = () => {
    const {
        dispatch,
        state: {transformedImage, selectedImage, selectedTransformation},
    } = useImageProvider();

    const {
        actions: {uploadImage, removeImage}
    } = useImageServiceApi();

    const setTransformedImage = useCallback((payload: File | null) => {
        dispatch({type: ImageActionType.SET_TRANSFORMED_IMAGE, payload});
    }, [dispatch])

    const setSelectedImage = useCallback((payload: ImageEntity | null) => {
        dispatch({type: ImageActionType.SELECT_IMAGE, payload});
    }, [dispatch])

    const {previewSource} = useImagePreviewSource(selectedImage?.file)

    const resetSelectedImage = useCallback(() => setSelectedImage(null), [setSelectedImage])

    const handleSave = useCallback(async () => {
        if (transformedImage) {
            await uploadImage(transformedImage)
            resetSelectedImage()
        }
    }, [uploadImage, transformedImage, resetSelectedImage])

    const handleRemove = useCallback(async () => {
        if (selectedImage) {
            await removeImage(selectedImage)
            resetSelectedImage()
        }
    }, [removeImage, selectedImage, resetSelectedImage])


    return {
        actions: {
            handleSave, handleRemove,
            setSelectedImage, resetSelectedImage,
            setTransformedImage,
        },
        state: {
            previewSource,
            selectedImage,
            transformedImage,
            selectedTransformation,
        }
    }
}