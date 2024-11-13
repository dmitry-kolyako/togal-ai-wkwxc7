// test/mocks.ts
import {ImageEntity, ImageModel} from "../../shared/types/Image";
import {Transformation, TransformationType} from "../../shared/types/Transformation";
import {ApiEndpoints, TApiConfig} from "../../shared/config/api.config.ts";
import {createUrlFromRoute} from "../../shared/utils/createUrlFromRoute.ts";
import {createUid} from "../../shared/utils/createUid.ts";

export const mockApiConfig: TApiConfig = {
    ServerPort: 3000,
    ServerHost: 'http://localhost',
    BaseUrl: 'http://localhost:3000',
    HistoryFileName: 'history.json',
};

const mockId = createUid()

export const mockImageModel: ImageModel = {
    id: mockId,
    filename: 'test-image.jpg',
    history: [],
    url: mockApiConfig.BaseUrl + createUrlFromRoute(ApiEndpoints.IMAGE, {id: mockId}),
    preview_url: mockApiConfig.BaseUrl + createUrlFromRoute(ApiEndpoints.IMAGE_PREVIEW, {id: mockId}),
};

export const mockImageEntity: ImageEntity = {
    ...mockImageModel,
    file: new File(['test'], 'test-image.jpg', {type: 'image/jpeg'}),
};

export const mockTransformation: Transformation = {
    type: TransformationType.ROTATE_LEFT,
};

export const mockTransformedFile = new File(['test'], 'transformed.jpg', {type: 'image/jpeg'})

export const mockImageId = createUid()

export const mockCanvas = document.createElement('canvas');

export const mockBlobUrl = URL.createObjectURL(mockTransformedFile);

