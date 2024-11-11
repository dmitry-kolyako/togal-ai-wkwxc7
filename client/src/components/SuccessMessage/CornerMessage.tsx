// CornerMessage.tsx
import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Layer} from "../../config/theme.ts";

export enum MessageType {
    SUCCESS, ERROR, WARNING
}

export type CornerMessageProps = {
    message: string;
    type?: MessageType;
    onHide?: () => void;
    duration?: number; // Duration in milliseconds before auto-hiding
}

export const CornerMessage: React.FC<CornerMessageProps> = ({
                                                                type,
                                                                message,
                                                                onHide,
                                                                duration = 3000,
                                                            }) => {
    const [isVisible, setIsVisible] = useState(true);
    const handleHide = useCallback(() => {
        setIsVisible(false);
        if (onHide) onHide();
    }, [setIsVisible, onHide]);

    useEffect(() => {
        const timer = setTimeout(handleHide, duration);
        return () => clearTimeout(timer);
    }, [duration, handleHide]);

    return isVisible && (
        <MessageContainer type={type}>
            <span>{message}</span>
            <CloseButton onClick={handleHide}>&times;</CloseButton>
        </MessageContainer>
    );
};


const MessageContainer = styled.div<{ type: MessageType }>`
    position: fixed;
    top: 1rem;
    right: 1rem;

    background-color: ${({type}) =>
            type === MessageType.ERROR ? '#f44336' :
                    type === MessageType.SUCCESS ? '#4CAF50' :
                            'transparent'};

    color: white;
    padding: 0.5rem 0 0.5rem 2rem;
    border-radius: 4px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 300px;
    z-index: ${Layer.Message};
    animation: fadeIn 0.3s ease-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
        color: #e0e0e0;
    }
`;

