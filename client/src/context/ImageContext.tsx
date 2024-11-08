// Define the action types as an enum
import React, {createContext} from 'react';
import {Transformation} from "../entities";
import {ImageAction, ImageState, initialState} from "../state/state.ts";

type ImageServiceApi = {
    uploadImage: (blob: Blob) => Promise<void>;
    loadImages: () => Promise<void>;
    applyTransformation: (transformation: Transformation) => void
    catchError: (error: unknown) => void;
    setError: (message: string) => void;
    clearError: () => void;
    withLoading: (handlerKey: string) => <T>(handler: Promise<T>) => Promise<T>;
}

type ImageContextType = {
    state: ImageState;
    dispatch: React.Dispatch<ImageAction>;
    api: ImageServiceApi;
};

export const ImageContext = createContext<ImageContextType>({
    state: initialState,
    dispatch: () => null,
    api: {
        withLoading: () => (handler) => handler,
        uploadImage: () => Promise.resolve(),
        loadImages: () => Promise.resolve(),
        applyTransformation: () => {
        },
        setError: () => {
        },
        catchError: () => {
        },
        clearError: () => {
        },
    },
    // actions: {
    //
    // }
});