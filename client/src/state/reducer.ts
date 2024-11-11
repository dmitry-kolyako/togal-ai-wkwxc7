import {ImageState} from "./type.ts";
import {ImageAction, ImageActionType} from "./actions.ts";

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
        case ImageActionType.REMOVE_FROM_GALLERY:
            return {
                ...state, gallery: state.gallery.filter(g => g.id !== action.payload)
            };
        case ImageActionType.SELECT_IMAGE:
            return {
                ...state,
                selectedImage: action.payload,
                transformedImage: null,
                transformationHistory: action.payload?.history || [],
                selectedTransformation: (action.payload?.history || []).length - 1
            };

        case ImageActionType.SET_TRANSFORMED_IMAGE:
            return {...state, transformedImage: action.payload};
        case ImageActionType.ADD_TRANSFORMATION:
            return {
                ...state,
                transformationHistory: [...state.transformationHistory, action.payload],
                selectedTransformation: state.transformationHistory.length
            };
        case ImageActionType.RESET_TRANSFORMATIONS:
            return {...state, transformationHistory: action.payload, selectedTransformation: action.payload.length - 1};

        case ImageActionType.SELECT_TRANSFORMATION:
            return {...state, selectedTransformation: action.payload};

        case ImageActionType.SET_LOADING:
            return {
                ...state, loading: {
                    ...state.loading,
                    [action.payload.action]: action.payload.status
                }
            };

        case ImageActionType.SET_ERROR:
            return {...state, error: action.payload};

        default:
            return state;
    }
};