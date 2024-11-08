import React, {useRef, useState} from 'react';
import {useImageControls} from "../../hooks";
import {Button, ErrorMessage} from "../Shared";
import {HiddenFileInput} from "./ImageUpload.components.tsx";
import {FileInputDropInput} from "../FileInputDrop/FileDropInput.tsx";

import {AcceptedFileTypes} from "../../../../shared/config/api.config.ts";

const AcceptedFileInput = AcceptedFileTypes.join(',');

export const ImageUpload: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const {resetTransformations, setSelectedImage, selectedImage} = useImageControls()

    const handleFileSelect = (selectedFile: File | null) => {
        const isAccepted = AcceptedFileTypes.includes(selectedFile.type.toLowerCase());
        if (selectedFile && isAccepted) {
            setSelectedImage({
                id: null,
                url: null,
                filename: selectedFile.name,
                file: selectedFile,
            });
            setError(null);
        } else {
            setSelectedImage(null);
            setError('Please select a JPG or PNG image');
        }
    }

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        handleFileSelect(selectedFile)
        event.target.value = '';
    };

    const handleDrop = (file: File) => {
        handleFileSelect(file)
        resetTransformations()
    };

    const handleReset = () => {
        handleFileSelect(null)
        setSelectedImage(null)
        resetTransformations()
        setError(null);

    };

    const handleDropAreaClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    return (
        <div>
            <h2>Upload an Image</h2>
            <FileInputDropInput
                onFinish={handleDrop}
                onClick={handleDropAreaClick}
            >
                <HiddenFileInput type="file"
                                 accept={AcceptedFileInput}
                                 onChange={handleFileChange}
                                 ref={fileInputRef}/>
                <p>Drag & drop an image here, or click to select one.</p>
            </FileInputDropInput>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {selectedImage && <Button onClick={handleReset}>
                Clear
            </Button>}
        </div>
    );
};