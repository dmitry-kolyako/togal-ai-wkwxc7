import {useMemo} from "react";
import {useImageControls, useImageServiceApi} from "../../hooks";
import {ImagePreview} from "./ImageEditor.components.tsx";
import {ImageTransformer} from "../ImageTransformer/ImageTransformer.tsx";
import {useTransformationControls} from "../../hooks/useTransformationControls.ts";
import {AsyncStatus} from "../../entities";
import {SuccessMessage} from "../SuccessMessage/SuccessMessage.tsx";
import {ThreeColumnGrid} from "../Shared/ThreeColumnGrid.tsx";
import {ImageEditorFileControls} from "./ImageEditorFileControls.tsx";
import {ImageEditorTransformationControls} from "./ImageEditorTransformationControls.tsx";

export const ImageEditor = () => {
    const {
        state: {selectedTransformation, previewSource},
        actions: {setTransformedImage}
    } = useImageControls()

    const {
        state: {transformationHistory}
    } = useTransformationControls()

    const {
        state: {statusUpload}
    } = useImageServiceApi()


    const activeHistory = useMemo(() => transformationHistory.slice(0, selectedTransformation + 1), [transformationHistory, selectedTransformation])

    return <div>
        <h2>Modify image</h2>
        <ImagePreview>
            {
                statusUpload === AsyncStatus.SUCCESS &&
                <SuccessMessage message={'Image saved'}/>
            }


            {previewSource ? (
                <ThreeColumnGrid>
                    {{
                        Left: <ImageEditorTransformationControls/>,
                        Center:
                            <ImageTransformer
                                onFinishTransform={setTransformedImage}
                                transformationHistory={activeHistory}
                                previewSource={previewSource}/>,
                        Right: <ImageEditorFileControls/>,
                    }}
                </ThreeColumnGrid>
            ) : 'No Image Selected'}

        </ImagePreview>
    </div>
}