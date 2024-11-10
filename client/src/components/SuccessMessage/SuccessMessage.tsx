// SuccessMessage.tsx
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

type SuccessMessageProps = {
    message: string;
    onHide?: () => void;
    duration?: number; // Duration in milliseconds before auto-hiding
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
                                                                  message,
                                                                  onHide,
                                                                  duration = 3000,
                                                              }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Automatically hide the message after the specified duration
        const timer = setTimeout(() => {
            setIsVisible(false);
            onHide();
        }, duration);

        // Clear the timeout if the component unmounts before the duration ends
        return () => clearTimeout(timer);
    }, [duration, onHide]);

    if (!isVisible) return null;

    return (
        <MessageContainer>
            <span>{message}</span>
            <CloseButton onClick={() => {
                setIsVisible(false);
                onHide();
            }}>&times;</CloseButton>
        </MessageContainer>
    );
};


const MessageContainer = styled.div`
    position: fixed;
    top: 1rem;
    right: 1rem;
    background-color: #4caf50;
    color: white;
    padding: 0.5rem 0 0.5rem 2rem;
    border-radius: 4px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 300px;
    z-index: 1000;
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

