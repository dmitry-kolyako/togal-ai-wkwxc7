import React, {useRef, useState} from 'react';
import {useImageControls} from "../../hooks";
import {Button, ErrorMessage} from "../Shared";
import {DropArea, HiddenFileInput} from "./ImageUpload.components.tsx";
import {AcceptedFiles} from "../../config/config.ts";


export const ImageUpload: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const droppedFile = event.dataTransfer.files[0];
        handleFileSelect(droppedFile);
    };

    const {selectImage, selectedImage, resetTransformations, setTransformedImage} = useImageControls()

    const handleFileSelect = (selectedFile: File | null) => {
        if (selectedFile && (AcceptedFiles.includes(selectedFile.type.toLowerCase()))) {
            selectImage({
                id: '1',
                url: `1`,
                blob: selectedFile
            });
            setError(null);
        } else {
            selectImage(null);
            setError('Please select a JPG or PNG image');
        }
    }

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        handleFileSelect(selectedFile)
        event.target.value = '';
    };

    const handleReset = () => {
        handleFileSelect(null)
        setTransformedImage(null)
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
            <DropArea
                isDragging={isDragging}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleDropAreaClick}
            >
                <HiddenFileInput type="file" accept={AcceptedFiles.join(',')} onChange={handleFileChange}
                                 ref={fileInputRef}/>
                <p>Drag & drop an image here, or click to select one.</p>
            </DropArea>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {selectedImage && <Button onClick={handleReset}>
                Clear
            </Button>}
        </div>
    );
};