import React, {useRef} from 'react';
import {useImageInput} from "../../hooks";
import {HiddenFileInput} from "./ImageInput.components.tsx";
import {FileInputDropInput} from "../FileInputDrop/FileInputDrop.tsx";

import {AcceptedFileTypes} from "../../../../shared/config/api.config.ts";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog.tsx";
import {Button, Container, ErrorMessage} from "../Shared";

const AcceptedFileInput = AcceptedFileTypes.join(',');

export const ImageInput: React.FC = () => {
    const {
        error,
        selectedImage,
        handleReset, handleFileChange, handleDrop,

        confirmDialogProps

    } = useImageInput();

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleDropAreaClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    return (
        <Container>
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

            <ConfirmationDialog
                title={"Update Image Confirmation"}
                {...confirmDialogProps}
            />

        </Container>
    );
};