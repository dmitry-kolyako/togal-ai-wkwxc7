// ConfirmationDialog.tsx
import styled from 'styled-components';

// Styled components for the dialog content
export const DialogTitle = styled.h2`
    margin: 0 0 1rem;
    font-size: 1.5rem;
`;

export const DialogMessage = styled.p`
    margin: 0 0 2rem;
    font-size: 1rem;
    color: #333;
`;

export const DialogActionsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
`;

export const DialogActionButton = styled.button<{ variant?: 'confirm' | 'cancel' }>`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;

    background-color: ${({variant}) =>
            variant === 'confirm' ? '#4CAF50' : '#f44336'};

    &:hover {
        background-color: ${({variant}) =>
                variant === 'confirm' ? '#45a049' : '#e57373'};
    }
`;

