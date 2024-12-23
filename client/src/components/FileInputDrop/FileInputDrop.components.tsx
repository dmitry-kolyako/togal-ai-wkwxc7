import styled, { css } from "styled-components";

export const FileInputDropComponents = styled('div').withConfig({
    shouldForwardProp: (prop) =>!['isDragging'].includes(prop),
})<{ isDragging?: boolean }>`
    padding: 20px;
    border: 2px dashed #ccc;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 10px;
    
    &:hover {
        border-color: #4a90e2;
        background-color: #f0f8ff;
    }
    
    ${({ isDragging }) =>
    isDragging &&
    css`
                border-color: #4a90e2;
                background-color: #f0f8ff;
            `}


`