import {useImageControls} from "../../hooks";

import {ImagePreview} from "./ImageDisplay.components.tsx";
import {ImageTransformer} from "../ImageTransformer/ImageTransformer.tsx";
import {useImagePreviewSource} from "../ImageTransformer/useImagePreviewSource.ts";
import {useMemo} from "react";

export const ImageDisplay = () => {
    const {selectedImage, setTransformedImage, transformationHistory} = useImageControls()
    const {previewSource} = useImagePreviewSource(selectedImage?.file)
    const isReady = useMemo(() => Boolean(previewSource && selectedImage), [previewSource, selectedImage])

    return <div>
        <ImagePreview>
            <p>Image Preview:</p>

            {isReady ? (
                <ImageTransformer
                    onFinishTransform={setTransformedImage}
                    transformationHistory={transformationHistory}
                    previewSource={previewSource}/>
            ) : 'No image Selected'}

        </ImagePreview>
    </div>
}