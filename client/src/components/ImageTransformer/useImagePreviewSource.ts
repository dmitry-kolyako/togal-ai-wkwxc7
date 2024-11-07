import {useEffect, useState} from "react";

export type TPreviewSource = {
    url: string;
    type: string;
} | null;

export type TWithPreviewSource = {
    previewSource: TPreviewSource;
}

export const useImagePreviewSource = (imageBlob?: Blob): TWithPreviewSource => {
    const [previewSource, setPreviewSource] = useState<TPreviewSource>(null);

    useEffect(() => {
        setPreviewSource((source) => {
            if (source?.url) {
                URL.revokeObjectURL(source?.url);
            }

            return imageBlob ? {
                url: URL.createObjectURL(imageBlob),
                type: imageBlob.type
            } : null;
        })

    }, [imageBlob, setPreviewSource]);

    // cleanup source
    useEffect(() => {
        return () => {
            if (previewSource?.url) {
                URL.revokeObjectURL(previewSource.url);
            }
        }
    }, [previewSource])

    return {
        previewSource
    }

}