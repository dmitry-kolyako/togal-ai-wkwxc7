import React, {useCallback, useEffect, useState} from "react";
import {useImageControls} from "./useImageControls.ts";
import {AcceptedFileTypes} from "../../../shared/config/api.config.ts";
import {useAppUiState} from "./useAppUiState.ts";

export const useImageInput = () => {
    const [error, setError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const {
        state: {selectedImage},
        actions: {setSelectedImage}
    } = useImageControls()

    const {hasUnsavedWarningText} = useAppUiState()

    const resetFileInput = useCallback(() => {
        setError(null);
        setSelectedFile(null);
    }, [setError, setSelectedFile]);

    const confirmInputFile = useCallback(() => {
        if (selectedFile) {
            setSelectedImage({
                id: null,
                url: null,
                file: selectedFile,
                filename: selectedFile.name,
                history: []
            });
            resetFileInput()
        }
    }, [selectedFile, setSelectedImage, resetFileInput])

    useEffect(() => {
        if (selectedFile && !hasUnsavedWarningText) {
            confirmInputFile()
        }
    }, [selectedFile, hasUnsavedWarningText, confirmInputFile]);


    const handleFileSelect = (file: File | null) => {
        setError(null);
        setSelectedFile(null);
        const isAccepted = AcceptedFileTypes.includes(file?.type.toLowerCase());
        if (file && isAccepted) {
            setSelectedFile(file)

        } else {
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
    };

    const handleReset = () => {
        handleFileSelect(null)
        setSelectedImage(null)
        setError(null);
    };


    return {
        handleDrop, handleFileChange, error, selectedImage,
        handleReset,

        confirmDialogProps: {
            message: hasUnsavedWarningText,
            isOpen: Boolean(hasUnsavedWarningText && selectedFile),
            onConfirm: confirmInputFile,
            onCancel: resetFileInput
        }
    }
}