import {ImageCollection, ImageModel, ImageModelId} from "../../../shared/types/Image.ts";
import {ApiEndpoints, TApiConfig} from "../../../shared/config/api.config.ts";
import {createUrlFromRoute} from "../../../shared/utils/createUrlFromRoute.ts";
import {TransformationHistory} from "../entities";
import {Fields} from "../../../shared/types/Fields.ts";

export class ApiServiceV1 {
    private static instance: ApiServiceV1;

    private config: TApiConfig

    private constructor(config: TApiConfig) {
        this.config = config;
    }

    // Singleton pattern to ensure a single instance of the service
    public static getInstance(config?: TApiConfig): ApiServiceV1 {
        if (!ApiServiceV1.instance) {
            ApiServiceV1.instance = new ApiServiceV1(config);
        }
        return ApiServiceV1.instance;
    }

    private endpoint(path: string) {
        return this.config.BaseUrl + path;
    }

    private async httpGet(path: string, init?: RequestInit) {
        return await fetch(this.endpoint(path), {
            ...init,
            method: 'GET',
        })
    }

    private async httpPost(path: string, init?: RequestInit) {
        return await fetch(this.endpoint(path), {
            ...init,
            method: 'POST',
        })
    }

    private async httpDel(path: string, init?: RequestInit) {
        return await fetch(this.endpoint(path), {
            ...init,
            method: 'DELETE',
        })
    }

    // Upload image to the backend
    public async uploadImage(original: File, transformed: File, history: TransformationHistory): Promise<ImageModel> {
        const historyBlob = new Blob([JSON.stringify(history)]);
        const historyFile = new File([historyBlob], this.config.HistoryFileName, {type: 'application/json'});

        const formData = new FormData();

        formData.append(Fields.Image, original, original.name);
        formData.append(Fields.Transformed, transformed, transformed.name);
        formData.append(Fields.History, historyFile, historyFile.name);

        try {
            const response = await this.httpPost(ApiEndpoints.UPLOAD, {body: formData})
            if (!response.ok) {
                throw new Error(`Failed to upload image: ${response.statusText}`);
            }
            return response.json();
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    // remove
    public async removeImage(id: ImageModelId): Promise<void> {
        try {
            const removeUrl = createUrlFromRoute(ApiEndpoints.REMOVE, {id})
            const response = await this.httpDel(removeUrl)
            if (!response.ok) {
                throw new Error(`Failed to upload image: ${response.statusText}`);
            }
            return Promise.resolve();
        } catch (error) {
            console.error('Error removing image:', error);
            throw error;
        }
    }

    public async loadImages(): Promise<ImageCollection> {
        try {
            const response = await this.httpGet(ApiEndpoints.IMAGES);

            if (!response.ok) {
                throw new Error(`Failed to load images`);
            }

            return response.json();
        } catch (error) {
            console.error('Error loading images', error);
            throw error;
        }
    }
}
