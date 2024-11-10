import {ImageState} from "./type.ts";


// Update the state to include an error field
export const initialState: ImageState = {
    gallery: [],
    selectedImage: null,
    transformedImage: null,
    transformationHistory: [],
    selectedTransformation: -1,
    error: null,
    loading: {},
};


