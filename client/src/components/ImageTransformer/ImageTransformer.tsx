import React, {useEffect, useRef} from 'react';
import {Transformation} from "../../entities";
import {TransformerCanvas, TransformerCanvasContainer} from "./ImageTransformer.components.tsx";
import {TPreviewSource} from "./useImagePreviewSource.ts";
import {CanvasSize} from "../../config/config.ts";
import {cutOutRectangleFromCanvasToBlob, transformImage} from "../../utils";

type Props = {
    previewSource: TPreviewSource
    transformationHistory: Transformation[]
    onFinishTransform: (file: File) => void
}


export const ImageTransformer: React.FC<Props> = ({previewSource, transformationHistory, onFinishTransform}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (!previewSource?.objectUrl) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const image = new Image();
        image.src = previewSource.objectUrl;
        image.onload = () => {
            const defaultScale = Math.min(
                1, CanvasSize.width / image.width, CanvasSize.height / image.height
            )

            canvas.width = CanvasSize.width;
            canvas.height = CanvasSize.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.scale(defaultScale, defaultScale);
            ctx.save();

            // Apply each transformation in the history
            const {transformed, scale} = transformationHistory
                .reduce((dimensions, transformation) => transformImage(ctx, transformation, dimensions), {
                    transformed: {
                        width: image.width,
                        height: image.height,
                    },
                    scale: defaultScale

                });

            const newSize = {
                width: transformed.width * scale,
                height: transformed.height * scale
            };

            ctx.drawImage(image, -image.width / 2, -image.height / 2);
            ctx.restore();

            if (onFinishTransform) {
                cutOutRectangleFromCanvasToBlob({
                    canvas, ctx, type: previewSource.type,
                }, {
                    x: Math.max(0, (canvas.width - newSize.width) / 2),
                    y: Math.max(0, (canvas.height - newSize.height) / 2),
                    w: Math.min(CanvasSize.width, newSize.width),
                    h: Math.min(CanvasSize.height, newSize.height),
                }).then(
                    blob => blob && onFinishTransform(new File([blob], previewSource.filename, {
                        type: previewSource.type
                    }))
                )
            }

        };

    }, [previewSource, transformationHistory, onFinishTransform]);

    return (
        <TransformerCanvasContainer>
            <TransformerCanvas ref={canvasRef}/>
        </TransformerCanvasContainer>
    );
};


