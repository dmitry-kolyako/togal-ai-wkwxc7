import {useImageControls, useImageServiceApi} from "../../hooks";

import {ImagePreview} from "./ImageDisplay.components.tsx";
import {ImageTransformer} from "../ImageTransformer/ImageTransformer.tsx";
import {useImagePreviewSource} from "../ImageTransformer/useImagePreviewSource.ts";
import {useMemo} from "react";
import {useTransformationControls} from "../../hooks/useTransformationControls.ts";
import {AsyncStatus} from "../../entities";
import {SuccessMessage} from "../SuccessMessage/SuccessMessage.tsx";

export const ImageDisplay = () => {
    const {
        state: {selectedImage, selectedTransformation},
        actions: {setTransformedImage}
    } = useImageControls()

    const {
        state: {transformationHistory}
    } = useTransformationControls()

    const {
        state: { statusUpload }
    } = useImageServiceApi()

    const {previewSource} = useImagePreviewSource(selectedImage?.file)
    const isReady = useMemo(() => Boolean(previewSource && selectedImage), [previewSource, selectedImage])

    const activeHistory = useMemo(() => transformationHistory.slice(0, selectedTransformation + 1), [transformationHistory, selectedTransformation])

    return <div>
        <ImagePreview>
            {
                statusUpload === AsyncStatus.SUCCESS &&
                <SuccessMessage message={'Image saved'} />
            }


            {isReady ? (
                <ImageTransformer
                    onFinishTransform={setTransformedImage}
                    transformationHistory={activeHistory}
                    previewSource={previewSource}/>
            ) : 'No image Selected'}

        </ImagePreview>
    </div>
}