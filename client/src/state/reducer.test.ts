// test/reducer.test.ts
import {beforeEach, describe, expect, it} from "vitest";
import {ImageAction, ImageActionType} from "./actions.ts";
import {imageReducer} from "./reducer.ts";
import {mockImageEntity, mockImageModel, mockTransformation, mockTransformedFile} from "../../test/mocks.ts";
import {ImageState} from "./type.ts";
import {initialState} from "./state.ts";
import {AsyncActionKeys, AsyncStatus} from "../entities"; // Adjust the import paths as necessary

describe('imageReducer', () => {
    let testState: ImageState;

    beforeEach(() => {
        testState = {
            ...initialState
        };
    });

    it('should set the gallery', () => {
        const action: ImageAction = {
            type: ImageActionType.SET_GALLERY,
            payload: [mockImageModel],
        };
        const newState = imageReducer(testState, action);
        expect(newState.gallery).toEqual([mockImageModel]);
    });

    it('should add an image to the gallery', () => {
        const action: ImageAction = {
            type: ImageActionType.ADD_TO_GALLERY,
            payload: mockImageModel,
        };

        const newState = imageReducer(testState, action);
        expect(newState.gallery).toEqual([mockImageModel]);
    });

    it('should remove an image from the gallery', () => {
        const actionAdd: ImageAction = {
            type: ImageActionType.ADD_TO_GALLERY,
            payload: mockImageModel,
        };
        const stateAfterAdd = imageReducer(testState, actionAdd);

        const actionRemove: ImageAction = {
            type: ImageActionType.REMOVE_FROM_GALLERY,
            payload: mockImageModel.id,
        };
        const newState = imageReducer(stateAfterAdd, actionRemove);
        expect(newState.gallery).toEqual([]);
    });

    it('should select an image', () => {
        const action: ImageAction = {
            type: ImageActionType.SELECT_IMAGE,
            payload: mockImageEntity,
        };

        const newState = imageReducer(testState, action);
        expect(newState.selectedImage).toEqual(mockImageEntity);
        expect(newState.transformationHistory).toEqual([]);
        expect(newState.selectedTransformation).toBe(-1);
    });

    it('should set the transformed image', () => {
        const action: ImageAction = {
            type: ImageActionType.SET_TRANSFORMED_IMAGE,
            payload: mockTransformedFile,
        };

        const newState = imageReducer(testState, action);
        expect(newState.transformedImage).toBeInstanceOf(File);
        expect(newState.transformedImage).toEqual(mockTransformedFile);
    });

    it('should add a transformation', () => {
        const action: ImageAction = {
            type: ImageActionType.ADD_TRANSFORMATION,
            payload: mockTransformation,
        };

        const newState = imageReducer(testState, action);
        expect(newState.transformationHistory).toContain(mockTransformation);
        expect(newState.selectedTransformation).toBeGreaterThan(-1);
    });

    it('should select a transformation', () => {
        const actionAdd: ImageAction = {
            type: ImageActionType.ADD_TRANSFORMATION,
            payload: mockTransformation,
        };
        const stateAfterAdd = imageReducer(testState, actionAdd);

        const actionSelect: ImageAction = {
            type: ImageActionType.SELECT_TRANSFORMATION,
            payload: 0,
        };

        const newState = imageReducer(stateAfterAdd, actionSelect);
        expect(newState.selectedTransformation).toBe(0);
    });

    it('should reset transformations', () => {
        const actionAdd: ImageAction = {
            type: ImageActionType.ADD_TRANSFORMATION,
            payload: mockTransformation,
        };
        const stateAfterAdd = imageReducer(testState, actionAdd);

        const actionReset: ImageAction = {
            type: ImageActionType.RESET_TRANSFORMATIONS,
            payload: [],
        };

        const newState = imageReducer(stateAfterAdd, actionReset);
        expect(newState.transformationHistory).toEqual([]);
        expect(newState.selectedTransformation).toBe(-1);
    });

    it('should set an error message', () => {
        const errorMessage = 'An error occurred';

        const action: ImageAction = {
            type: ImageActionType.SET_ERROR,
            payload: errorMessage,
        };

        const newState = imageReducer(testState, action);
        expect(newState.error).toBe(errorMessage);
    });

    it('should set loading status', () => {
        const action: ImageAction = {
            type: ImageActionType.SET_LOADING,
            payload: {action: AsyncActionKeys.GET_GALLERY, status: AsyncStatus.PROGRESS},
        };

        const newState = imageReducer(testState, action);
        expect(newState.loading[AsyncActionKeys.GET_GALLERY] === AsyncStatus.PROGRESS).toBe(true);
    });
});
