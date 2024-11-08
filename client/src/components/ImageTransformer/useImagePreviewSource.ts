import {useEffect, useState} from "react";

export type TPreviewSource = {
    objectUrl: string;
    filename: string;
    type: string;
} | null;

export type TWithPreviewSource = {
    previewSource: TPreviewSource;
}

export const useImagePreviewSource = (file: File): TWithPreviewSource => {
    const [previewSource, setPreviewSource] = useState<TPreviewSource>(null);

    useEffect(() => {
        setPreviewSource((source) => {
            if (source?.objectUrl) {
                URL.revokeObjectURL(source?.objectUrl);
            }

            return file ? {
                objectUrl: URL.createObjectURL(file),
                filename: file.name,
                type: file.type
            } : null;
        })

    }, [file, setPreviewSource]);

    // cleanup source
    useEffect(() => {
        return () => {
            if (previewSource?.objectUrl) {
                URL.revokeObjectURL(previewSource.objectUrl);
            }
        }
    }, [previewSource])

    return {
        previewSource
    }

}