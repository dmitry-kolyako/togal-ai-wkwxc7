import {useCallback, useEffect, useMemo, useState} from "react";
import {useImageProvider} from "./useImageProvider.ts";
import {useImageControls} from "./useImageControls.ts";
import {ImageCollection, ImageEntity, ImageModel} from "../../../shared/types/Image.ts";
import {useImageServiceApi} from "./useImageServiceApi.ts";
import {AsyncActionKeys} from "../entities";
import {getFileFromUrl} from "../utils";
import {useAppUiState} from "./useAppUiState.ts";
import {TWithConfirmationDialog} from "../components/ConfirmationDialog/ConfirmationDialog.types.ts";

type TControls = {
    state: TWithConfirmationDialog & {
        gallery: ImageCollection
        selectedImage: ImageEntity | null
    },
    actions: {
        handleSelect: (image: ImageModel) => () => void
    }
}

export const useGalleryControls = (): TControls => {
    const {
        state: {gallery},
        actions: {withAsyncProgress}
    } = useImageProvider()

    const [preparedImage, setPreparedImage] = useState<ImageModel | null>(null);

    const { actions: {loadImages }} = useImageServiceApi()
    const {hasUnsavedWarningText} = useAppUiState()

    const trackImageLoading = useMemo(() => withAsyncProgress(AsyncActionKeys.GET_IMAGE), [withAsyncProgress])

    const {
        state: {selectedImage},
        actions: {setSelectedImage}
    } = useImageControls()

    useEffect(() => {
        loadImages()
    }, [loadImages]);

    const handleSelect = useCallback(
        (image: ImageModel) => () => {
            setPreparedImage(image)
        }, [setPreparedImage]
    )

    const applyPrepared = useCallback((() => {
        if (preparedImage) {
            setPreparedImage(null)
            trackImageLoading(
                getFileFromUrl(preparedImage)
            ).then(file => setSelectedImage({
                ...preparedImage,
                file
            }))
        }
    }), [preparedImage, setPreparedImage, trackImageLoading, setSelectedImage])

    const needConfirmation = Boolean(preparedImage && hasUnsavedWarningText);

    useEffect(() => {
        // auto-update on constraints met
        if (!needConfirmation && preparedImage) {
            applyPrepared()
        }
    }, [preparedImage, needConfirmation, applyPrepared]);

    return {
        state: {
            gallery, selectedImage,
            confirmationDialog: {
                isOpen: needConfirmation,
                onConfirm: applyPrepared,
                onCancel: () => setPreparedImage(null),
                message: hasUnsavedWarningText
            }
        },
        actions: {
            handleSelect,
        }
    }

}