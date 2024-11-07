import React, {useEffect, useRef} from 'react';
import {Transformation} from "../../entities";
import {transformImage} from "../../utils/transformImage.ts";

import {cutOutRectangleFromCanvasToBlob} from "../../utils/cutOutRectangleFromCanvas.ts";
import {TransformerCanvas, TransformerCanvasContainer} from "./ImageTransformer.components.tsx";
import {TPreviewSource} from "./useImagePreviewSource.ts";
import {CanvasMaxSize} from "../../config/config.ts";

type Props = {
    previewSource: TPreviewSource
    transformationHistory: Transformation[]
    onFinishTransform: (blob: Blob) => void
}


export const ImageTransformer: React.FC<Props> = ({previewSource, transformationHistory, onFinishTransform}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (!previewSource?.url) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const image = new Image();
        image.src = previewSource.url;
        image.onload = () => {
            const defaultScale = Math.min(
                1, CanvasMaxSize.width / image.width, CanvasMaxSize.height / image.height
            )

            canvas.width = CanvasMaxSize.width;
            canvas.height = CanvasMaxSize.height;

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
                    w: Math.min(CanvasMaxSize.width, newSize.width),
                    h: Math.min(CanvasMaxSize.height, newSize.height),
                }).then(
                    blob => {
                        if (blob) {
                            onFinishTransform(blob)
                        }
                    }
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


