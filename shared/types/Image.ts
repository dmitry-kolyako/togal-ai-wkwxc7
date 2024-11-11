import {TransformationHistory} from "./Transformation";

export type ImageModelId = string

export type ImageModelBase = {
    id: ImageModelId;
    filename: string;
    history: TransformationHistory
    url: string;
    preview_url: string;
};

export type ImageModel = {
    id: ImageModelId;
    filename: string;
    history: TransformationHistory
    url: string;
    preview_url: string;
};

export type ImageCollection = Array<ImageModel>

export type ImageEntity = ImageModel & {
    file: File;
};