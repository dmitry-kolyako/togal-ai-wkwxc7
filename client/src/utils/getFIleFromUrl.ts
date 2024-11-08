import {ImageModel} from "../../../shared/types/Image.ts";

export const getFileFromUrl = async ({url, filename}: ImageModel, type = 'image/jpeg'): Promise<File> => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], filename, {
        type: data.type || type,
    });
}