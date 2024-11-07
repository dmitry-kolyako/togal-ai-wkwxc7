import {Debugger} from "../Shared/Debugger.tsx";
import {useImageContext} from "../../hooks";
import {useEffect, useState} from "react";
import {ImagePreview} from "./ImageDisplay.components.tsx";

export const ImageDisplay = () => {
    const {state: {gallery, transformedImage}} = useImageContext()
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        const blobUrl = transformedImage ? URL.createObjectURL(transformedImage) : null
        setPreviewUrl(blobUrl);
    }, [setPreviewUrl, transformedImage]);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return <div>
        <div>

            {previewUrl && (
                <ImagePreview>
                    <p>Image Preview:</p>
                    <img src={previewUrl} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </ImagePreview>
            )}
        </div>
        <div>

            <Debugger {...{
                gallery,
                preview: {
                    type: transformedImage?.type,
                    name: transformedImage?.name
                }
            }}/>
        </div>
    </div>
}