import {useImageProvider} from "./useImageProvider.ts";
import {useCallback} from "react";
import {ImageEntity} from "../entities";
import {ImageActionType} from "../state";
import {useImageServiceApi} from "./useImageServiceApi.ts";
import {useImagePreviewSource} from "../components/ImageTransformer/useImagePreviewSource.ts";
import {useTransformationControls} from "./useTransformationControls.ts";

export const useImageControls = () => {
    const {
        dispatch,
        state: {transformedImage, selectedImage, selectedTransformation},
    } = useImageProvider();
    const {
        state: {transformationHistory},
    } = useTransformationControls();

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
        if (selectedImage && transformedImage) {
            await uploadImage(selectedImage.file, transformedImage, transformationHistory)
        }
    }, [uploadImage, selectedImage, transformedImage, transformationHistory])

    const handleRemove = useCallback(async () => {
        if (selectedImage) {
            await removeImage(selectedImage)
        }
    }, [removeImage, selectedImage])


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