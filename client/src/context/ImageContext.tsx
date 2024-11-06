// Define the action types as an enum
import React, {createContext} from 'react';
import {ImageAction, ImageState, initialState} from "../state/state.ts";
import {Transformation} from "../entities";


type ImageServiceApi = {
    uploadImage: (file: File) => Promise<void>;
    applyTransformation: (transformation: Transformation) => void
    catchError: (error: unknown) => void;
    showError: (message: string) => void;
    clearError: () => void;
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
        uploadImage: () => Promise.resolve(),
        applyTransformation: () => {
        },
        showError: () => {
        },
        catchError: () => {
        },
        clearError: () => {
        },

    },
});