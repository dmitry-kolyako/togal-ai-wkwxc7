import React from 'react';
import {useImageControls} from "../../hooks";
import {TransformationType} from "../../entities";
import {ControlButton, ControlPanel} from "./Controls.components.tsx";
import {Debugger} from "../Shared/Debugger.tsx";

export const Controls: React.FC = () => {
    const {transformedImage, addTransformation} = useImageControls()

    const handleTransform = (type: TransformationType) => {
        // handle transformation, update image transformed, track history
        // dispatch({type: ImageActionType.SET_TRANSFORMED, payload: type});
        addTransformation({type});
    };

    const handleSave = async () => {
        console.log('Saving current transformations...');

        // const formData = new FormData();
        // formData.append('image', transformedImage);
        //
        // try {
        //     await uploadImage(transformedImage);
        //     selectTransformedImage(null);
        // } catch (error: unknown) {
        //     setError(catchErrorMessage(error, 'An error occurred during upload'));
        // }
    };

    const isDisabled = !transformedImage

    return (
        <div>

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
                               onClick={() => handleTransform(TransformationType.RESET)}>Reset</ControlButton>
                <ControlButton disabled={isDisabled} onClick={handleSave}>Save</ControlButton>

            </ControlPanel>

            <div>
                <Debugger {...{isDisabled}} />
            </div>

        </div>

    );
};
