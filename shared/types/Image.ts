export type ImageModelId = string

export type ImageModel = {
    id: ImageModelId;
    url: string;
    filename: string;
};

export type ImageCollection = Array<ImageModel>

export type ImageEntity = ImageModel & {
    file: File;
};

