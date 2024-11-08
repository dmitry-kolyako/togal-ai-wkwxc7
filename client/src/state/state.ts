import {AsyncAction, AsyncStatus, ImageEntity, ImageModel, Transformation} from "../entities";

export type ImageState = {
    gallery: ImageModel[];
    selectedImage: ImageEntity | null;
    transformedImage: File | null;
    transformationHistory: Transformation[];
    error: string | null;
    loading: Record<string, AsyncStatus | null>;
};

export enum ImageActionType {
    SET_GALLERY = 'SET_GALLERY',
    ADD_TO_GALLERY = 'ADD_TO_GALLERY',
    SELECT_IMAGE = 'SELECT_IMAGE',
    SET_TRANSFORMED_IMAGE = 'SET_TRANSFORMED_IMAGE',
    ADD_TRANSFORMATION = 'ADD_TRANSFORMATION',
    RESET_TRANSFORMATIONS = 'RESET_TRANSFORMATIONS',
    SET_ERROR = 'SET_ERROR',
    SET_LOADING = 'SET_LOADING',
}

// Define the action types, including the new error action
export type ImageAction =
    | { type: ImageActionType.SET_GALLERY; payload: ImageModel[] }
    | { type: ImageActionType.ADD_TO_GALLERY; payload: ImageModel }
    | { type: ImageActionType.SELECT_IMAGE; payload: ImageEntity | null }
    | { type: ImageActionType.SET_TRANSFORMED_IMAGE; payload: File | null }
    | { type: ImageActionType.ADD_TRANSFORMATION; payload: Transformation }
    | { type: ImageActionType.RESET_TRANSFORMATIONS }
    | { type: ImageActionType.SET_ERROR; payload: string | null }
    | { type: ImageActionType.SET_LOADING; payload: AsyncAction }
    ;

// Update the state to include an error field
export const initialState: ImageState = {
    gallery: [],
    selectedImage: null,
    transformedImage: null,
    transformationHistory: [],
    error: null,
    loading: {},
};

export const imageReducer = (state: ImageState, action: ImageAction): ImageState => {
    switch (action.type) {
        case ImageActionType.SET_GALLERY:
            return {...state, gallery: action.payload};
        case ImageActionType.ADD_TO_GALLERY:
            return {
                ...state, gallery: [
                    action.payload,
                    ...state.gallery,
                ]
            };
        case ImageActionType.SELECT_IMAGE:
            return {...state, selectedImage: action.payload};
        case ImageActionType.SET_TRANSFORMED_IMAGE:
            return {...state, transformedImage: action.payload};
        case ImageActionType.ADD_TRANSFORMATION:
            return {
                ...state,
                transformationHistory: [...state.transformationHistory, action.payload],
            };
        case ImageActionType.RESET_TRANSFORMATIONS:
            return {...state, transformationHistory: []};
        case ImageActionType.SET_ERROR:
            return {...state, error: action.payload}; // Update error state
        case ImageActionType.SET_LOADING:
            return {
                ...state, loading: {
                    ...state.loading,
                    [action.payload.action]: action.payload.status
                }
            }; // Update error state
        default:
            return state;
    }
};
