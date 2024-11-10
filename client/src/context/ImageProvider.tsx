import {FC, PropsWithChildren, useReducer} from "react";
import {ImageContext} from "./ImageContext";
import {ApiServiceV1} from "../services/ApiService.ts";
import {imageReducer} from "../state/reducer.ts";
import {initialState} from "../state/state.ts";

type Props = {
    ApiService: ApiServiceV1
};
export const ImageProvider: FC<PropsWithChildren<Props>> = ({children, ApiService}) => {
    const [state, dispatch] = useReducer(imageReducer, initialState);
    const value = {state, dispatch, api: ApiService};

    return (
        <ImageContext.Provider value={value}>
            {children}
        </ImageContext.Provider>
    );

}


