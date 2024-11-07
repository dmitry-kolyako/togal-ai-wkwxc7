import {Transformation, TransformationType} from "../entities";
import {CanvasScaleStep} from "../config/config.ts";

const ScaleShiftDown = 1 - CanvasScaleStep;
const ScaleShiftUp = 1 + CanvasScaleStep;

type Box = {
    width: number,
    height: number,
};
type Dimensions = {
    transformed: Box,
    scale: number,

}

export const transformImage = (
    ctx: CanvasRenderingContext2D,
    transformation: Transformation,
    {transformed, transformed: {width, height}, scale}: Dimensions
) => {

    switch (transformation.type) {
        case TransformationType.ROTATE_RIGHT:
            ctx.rotate((90 * Math.PI) / 180);
            transformed = {
                width: height,
                height: width,
            }

            break;
        case TransformationType.ROTATE_LEFT:
            ctx.rotate((-90 * Math.PI) / 180);
            transformed = {
                width: height,
                height: width,
            }

            break;
        case TransformationType.ZOOM_IN:

            scale = scale * ScaleShiftUp;
            ctx.scale(ScaleShiftUp, ScaleShiftUp);
            break;
        case TransformationType.ZOOM_OUT:

            scale = scale * ScaleShiftDown;
            ctx.scale(ScaleShiftDown, ScaleShiftDown);
            break;
        case TransformationType.RESET:
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            break;
        default:
            break;
    }

    return {
        scale,
        transformed: {
            ...transformed
        }
    }
};
