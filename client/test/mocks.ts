// test/mocks.ts
import {ImageEntity, ImageModel} from "../../shared/types/Image";
import {Transformation, TransformationType} from "../../shared/types/Transformation";
import {ApiEndpoints, TApiConfig} from "../../shared/config/api.config.ts";
import {createUrlFromRoute} from "../../shared/utils/createUrlFromRoute.ts";

export const mockApiConfig: TApiConfig = {
    ServerPort: 3000,
    ServerHost: 'http://localhost',
    BaseUrl: 'http://localhost:3000',
    HistoryFileName: 'history.json',
};

const mockImageDirId = 'test-123'

export const mockImageModel: ImageModel = {
    id: '1',
    filename: 'test-image.jpg',
    history: [],
    url: mockApiConfig.BaseUrl + createUrlFromRoute(ApiEndpoints.IMAGE, {id: mockImageDirId}),
    preview_url: mockApiConfig.BaseUrl + createUrlFromRoute(ApiEndpoints.IMAGE_PREVIEW, {id: mockImageDirId}),
};

export const mockImageEntity: ImageEntity = {
    ...mockImageModel,
    file: new File(['test'], 'test-image.jpg', {type: 'image/jpeg'}),
};

export const mockTransformation: Transformation = {
    type: TransformationType.ROTATE_LEFT,
};

export const mockTransformedFile = new File(['test'], 'transformed.jpg', {type: 'image/jpeg'})