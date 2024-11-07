type TCanvasSourceContext = {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    type: string
}

type TArea = {
    x: number, y: number, w: number, h: number
}

export const cutOutRectangleFromCanvasToBlob = (
    {canvas, ctx, type}: TCanvasSourceContext,
    {x, y, w, h}: TArea
): Promise<Blob | null> => (new Promise((resolve) => {
    try {
        const imageData = ctx.getImageData(x, y, w, h);

        const newCanvas = document.createElement('canvas');
        newCanvas.width = w;
        newCanvas.height = h;

        const newCtx = newCanvas.getContext('2d');

        if (newCtx) {
            newCtx.putImageData(imageData, 0, 0);
            newCanvas.toBlob(resolve, type);
        } else {
            canvas.toBlob(resolve, type)
        }
    } catch {
        // workaround if newCtx failed
        canvas.toBlob(resolve, type)
    }
}))