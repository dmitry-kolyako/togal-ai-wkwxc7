import {useImageProvider} from "./useImageProvider.ts";
import {useMemo} from "react";
import {AsyncStatus} from "../entities";

type TUIState = {
    isLoading: boolean,
    hasUnsavedWarningText: null | string

}
export const useAppUiState = (): TUIState => {
    const {state: {loading, selectedImage, transformationHistory}} = useImageProvider()

    const isLoading = useMemo(() => (
        Object.values(loading).some(status => status === AsyncStatus.PROGRESS)
    ), [loading])

    const hasUnsavedWarningText = useMemo(() => {
        return selectedImage === null
            ? null
            : selectedImage.id === null
                ? 'Are you sure you want to change unsaved image?'
                : transformationHistory.length
                    ? 'Are you sure you want to change image with unsaved changes?'
                    : null
    }, [selectedImage, transformationHistory])

    return {isLoading, hasUnsavedWarningText}

}