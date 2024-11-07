import React, {useCallback, useMemo} from 'react';
import {useImageControls, useImageUpload} from "../../hooks";
import {TransformationType} from "../../entities";
import {ControlButton, ControlPanel} from "./TransformationControls.components.tsx";

export const TransformationControls: React.FC = () => {
    const {transformedImage, addTransformation, resetTransformations} = useImageControls()
    const {uploadImage} = useImageUpload();

    const handleTransform = useCallback((type: TransformationType) => {
        addTransformation({type});
    }, [addTransformation]);

    const handleSave = useCallback(async () => {
        // ready to save:
        if (transformedImage) {
            await uploadImage(transformedImage)
            await resetTransformations()
        }
    }, [uploadImage, transformedImage, resetTransformations])

    const isDisabled = useMemo(() => (!transformedImage), [transformedImage])

    return (
        <div>

            <h2>Modify image</h2>

            <ControlPanel>
                <ControlButton disabled={isDisabled} onClick={() => handleTransform(TransformationType.ROTATE_LEFT)}>Rotate
                    Left</ControlButton>
                <ControlButton disabled={isDisabled} onClick={() => handleTransform(TransformationType.ROTATE_RIGHT)}>Rotate
                    Right</ControlButton>
                <ControlButton disabled={isDisabled} onClick={() => handleTransform(TransformationType.ZOOM_IN)}>Zoom
                    In</ControlButton>
                <ControlButton disabled={isDisabled} onClick={() => handleTransform(TransformationType.ZOOM_OUT)}>Zoom
                    Out</ControlButton>
                <ControlButton disabled={isDisabled}
                               onClick={() => resetTransformations()}>Reset</ControlButton>
                <ControlButton disabled={isDisabled} onClick={handleSave}>Save</ControlButton>

            </ControlPanel>
        </div>

    );
};
