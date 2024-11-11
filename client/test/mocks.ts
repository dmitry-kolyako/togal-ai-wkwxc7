// test/mocks.ts
import {ImageEntity, ImageModel} from "../../shared/types/Image";
import {Transformation, TransformationType} from "../../shared/types/Transformation";

export const mockImageModel: ImageModel = {
    id: '1',
    filename: 'test-image.jpg',
    history: [],
    url: 'http://example.com/test-image.jpg',
    preview_url: 'http://example.com/test-image-preview.jpg',
};

export const mockImageEntity: ImageEntity = {
    ...mockImageModel,
    file: new File(['test'], 'test-image.jpg', { type: 'image/jpeg' }),
};

export const mockTransformation: Transformation = {
    type: TransformationType.ROTATE_LEFT,
};

export const mockTransformedFile = new File(['test'], 'transformed.jpg', {type: 'image/jpeg'})