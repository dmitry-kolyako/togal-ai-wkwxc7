import {useContext} from "react";
import {useImageProviderActions} from "./useImageProviderActions.ts";
import {ImageContext} from "../context";

// make it private
const useImageContext = () => {
    const context = useContext(ImageContext);

    if (!context) {
        // If context is undefined (i.e., outside of the provider), throw an error.
        throw new Error('useImageContext must be used within an ImageProvider');
    }

    return context;
}

export const useImageProvider = () => {
    const {dispatch, state, api} = useImageContext();

    const actions = useImageProviderActions(dispatch)

    return {
        dispatch, state, api,
        actions,
    }
}
