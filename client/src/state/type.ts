import {ImageEntity, ImageModel} from "../../../shared/types/Image.ts";
import {AsyncActionKeys, AsyncStatus, Transformation} from "../entities";

export type ImageState = {
    gallery: ImageModel[];
    selectedImage: ImageEntity | null;
    transformedImage: File | null;
    transformationHistory: Transformation[];
    selectedTransformation: number;
    error: string | null;
    loading: Partial<Record<AsyncActionKeys, AsyncStatus | null>>;
};

