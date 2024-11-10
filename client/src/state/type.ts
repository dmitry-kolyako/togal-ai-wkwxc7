import {ImageEntity, ImageModel} from "../../../shared/types/Image.ts";
import {AsyncStatus, Transformation} from "../entities";

export type ImageState = {
    gallery: ImageModel[];
    selectedImage: ImageEntity | null;
    transformedImage: File | null;
    transformationHistory: Transformation[];
    selectedTransformation: number;
    error: string | null;
    loading: Record<string, AsyncStatus | null>;
};

