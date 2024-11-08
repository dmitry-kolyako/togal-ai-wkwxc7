import {useContext} from "react";
import {ImageContext} from "../context/ImageContext.tsx";

export const useImageContext = () => {
    const context = useContext(ImageContext);

    if (!context) {
        // If context is undefined (i.e., outside of the provider), throw an error.
        throw new Error('useImageContext must be used within an ImageProvider');
    }

    return context;
}
