import {ImageCollection, ImageModel} from "../../../shared/types/Image.ts";
import {ApiEndpoints, TApiConfig} from "../../../shared/config/api.config.ts";

export class ApiServiceV1 {
    private static instance: ApiServiceV1;

    private baseUrl: string

    private constructor({BaseUrl}: TApiConfig) {
        this.baseUrl = BaseUrl;
    }

    // Singleton pattern to ensure a single instance of the service
    public static getInstance(config?: TApiConfig): ApiServiceV1 {
        if (!ApiServiceV1.instance) {
            ApiServiceV1.instance = new ApiServiceV1(config);
        }
        return ApiServiceV1.instance;
    }

    private endpoint(path: string) {
        return this.baseUrl + path;
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

    // Upload image to the backend
    public async uploadImage(file: File): Promise<ImageModel> {
        const formData = new FormData();
        formData.append('image', file);

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
