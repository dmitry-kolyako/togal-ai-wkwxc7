import React, {FC, PropsWithChildren, useState} from "react";
import {FileDropInputComponents} from "./FileDropInput.components.tsx";

type Porps = {
    onFinish: (file: File) => void,
    onClick: () => void,
};

export const FileInputDropInput: FC<PropsWithChildren<Porps>> = ({children, onFinish, onClick}) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
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
        onFinish(droppedFile);
    };

    const handleDropAreaClick = () => {
        onClick();
    }


    return <FileDropInputComponents
        isDragging={isDragging}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleDropAreaClick}
    >
        {children}
    </FileDropInputComponents>
}