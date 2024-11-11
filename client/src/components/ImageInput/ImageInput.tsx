import React, {useRef} from 'react';
import {useImageInput} from "../../hooks";
import {ClearButton, HiddenFileInput} from "./ImageInput.components.tsx";
import {FileInputDropInput} from "../FileInputDrop/FileInputDrop.tsx";

import {AcceptedFileTypes} from "../../../../shared/config/api.config.ts";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog.tsx";
import {Container, ErrorMessage} from "../Shared";
import {useDialogControls} from "../ConfirmationDialog/useDialogControls.ts";

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

    const clearDialog = useDialogControls()


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
                <p><u>Drag</u> & <u>drop</u> an image here, or <u>click</u> to select one.</p>
            </FileInputDropInput>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {selectedImage && <ClearButton onClick={
                () => clearDialog.open()
            }>
                Clear Selected Image
            </ClearButton>}

            <ConfirmationDialog
                title={"Update Image Confirmation"}
                {...confirmDialogProps}
            />

            <ConfirmationDialog
                isOpen={clearDialog.isOpen}
                title={"Clear Selected Image Confirmation"}
                onCancel={()=>clearDialog.close()}
                onConfirm={()=>{
                    handleReset()
                    clearDialog.close()
                }}
                message={
                    'Are you sure to cleanup current image selected?'
                }

            />

        </Container>
    );
};