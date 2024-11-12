// Define the action types as an enum
import React, {createContext} from 'react';
import {ImageAction, ImageState, initialState} from "../state";
import {ApiServiceV1} from "../services";

type ImageContextType = {
    state: ImageState;
    dispatch: React.Dispatch<ImageAction>;
    api: ApiServiceV1;
};

export const ImageContext = createContext<ImageContextType>({
    state: initialState,
    dispatch: () => null,
    api: {} as ApiServiceV1,
});