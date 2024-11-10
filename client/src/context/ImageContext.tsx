// Define the action types as an enum
import React, {createContext} from 'react';
import {AsyncActionKeys, Transformation} from "../entities";
import {ImageAction, ImageState, initialState} from "../state";
import {ApiServiceV1} from "../services";

export type ImageServiceApi = {
    uploadImage: (blob: Blob) => Promise<void>;
    loadImages: () => Promise<void>;
    applyTransformation: (transformation: Transformation) => void
    catchError: (error: unknown) => void;
    setError: (message: string) => void;
    clearError: () => void;
    withAsyncProgress: (handlerKey: AsyncActionKeys) => <T>(handler: Promise<T>) => Promise<T>;
}

type ImageContextType = {
    state: ImageState;
    dispatch: React.Dispatch<ImageAction>;
    api: ApiServiceV1;
};

export const ImageContext = createContext<ImageContextType>({
    state: initialState,
    dispatch: () => null,
    api: {} as ApiServiceV1,
    // actions: {
    //
    // }
});