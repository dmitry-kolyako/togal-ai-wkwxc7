import {useImageContext} from "./useImageContext.ts";

export const useImageUpload = () => {
    const {
        state: { loading },
        api: { uploadImage, catchError },
    } = useImageContext()
    return {
        uploadImage, loading, catchError
    }

}