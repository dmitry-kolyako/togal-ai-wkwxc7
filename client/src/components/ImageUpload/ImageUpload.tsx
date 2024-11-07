import React, {useState} from 'react';
import {useImageControls} from "../../hooks";
import {Debugger} from "../Shared/Debugger.tsx";
import {ErrorMessage} from "../Shared/ErrorMessage.tsx";
import {Button} from "../Shared/Button.tsx";

export const ImageUpload: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const {selectTransformedImage, transformedImage, resetTransformations} = useImageControls()

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;

        // Check file type
        if (selectedFile && (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png')) {
            selectTransformedImage(selectedFile);
            setError(null);
        } else {
            selectTransformedImage(null);
            setError('Please select a JPG or PNG image');
        }

        event.target.value = '';
    };

    const handleReset = () => {
        resetTransformations()
        setError(null);
    };

    return (
        <div>
            <h2>Upload an Image</h2>
            <input type="file" accept="image/jpeg,image/png" onChange={handleFileChange}/>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button onClick={handleReset} disabled={!transformedImage}>
                Clear
            </Button>
            <Debugger {...{
                type: transformedImage?.type,
                name: transformedImage?.name
            }}/>
        </div>
    );
};