export type ImageModel = {
    id: string;
    url: string;
    filename: string;
};

export type ImageCollection = Array<ImageModel>

export type ImageEntity = ImageModel & {
    file: File;
};

