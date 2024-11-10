import {ImageEntity, ImageModel, ImageModelId} from "../../../shared/types/Image.ts";
import {AsyncAction, Transformation} from "../entities";

export enum ImageActionType {
    SET_GALLERY = 'SET_GALLERY',
    ADD_TO_GALLERY = 'ADD_TO_GALLERY',
    REMOVE_FROM_GALLERY = 'REMOVE_FROM_GALLERY',
    SELECT_IMAGE = 'SELECT_IMAGE',
    SET_TRANSFORMED_IMAGE = 'SET_TRANSFORMED_IMAGE',
    ADD_TRANSFORMATION = 'ADD_TRANSFORMATION',
    SELECT_TRANSFORMATION = 'SELECT_TRANSFORMATION',
    RESET_TRANSFORMATIONS = 'RESET_TRANSFORMATIONS',
    SET_ERROR = 'SET_ERROR',
    SET_LOADING = 'SET_LOADING',
}


// Define the action types, including the new error action
export type ImageAction =
    | { type: ImageActionType.SET_GALLERY; payload: ImageModel[] }
    | { type: ImageActionType.ADD_TO_GALLERY; payload: ImageModel }
    | { type: ImageActionType.REMOVE_FROM_GALLERY; payload: ImageModelId }
    | { type: ImageActionType.SELECT_IMAGE; payload: ImageEntity | null }
    | { type: ImageActionType.SET_TRANSFORMED_IMAGE; payload: File | null }
    | { type: ImageActionType.ADD_TRANSFORMATION; payload: Transformation }
    | { type: ImageActionType.SELECT_TRANSFORMATION; payload: number }
    | { type: ImageActionType.RESET_TRANSFORMATIONS; payload: Transformation[] }
    | { type: ImageActionType.SET_ERROR; payload: string | null }
    | { type: ImageActionType.SET_LOADING; payload: AsyncAction }
    ;
