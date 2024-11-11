// ButtonWithIcon.tsx
import React, {PropsWithChildren} from 'react';
import styled, {css} from 'styled-components';
import {Button} from "./Button.tsx";
import {Breakpoint} from "../../config/theme.ts";

interface ButtonWithIconProps {
    disabled?: boolean;
    fullWidth?: boolean;
    icon: React.ReactNode;
    onClick: () => void;
    position?: 'left' | 'right';
    ariaLabel?: string;
}

const StyledButton = styled(Button).withConfig({
    shouldForwardProp: (prop) => !['position', 'fullWidth'].includes(prop),
})<{ position?: 'left' | 'right', fullWidth?: boolean }>`
    display: inline-flex;
    align-items: center;
    padding: 8px 10px 8px 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1); // Light background on hover
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5); // Highlight on focus
    }


    ${({fullWidth}) => (
            fullWidth && css`width: 100%`
    )};

    svg, .material-icons {
        fill: currentColor; // Inherit color for flexibility
        //     font-size: 1.2em;
        margin: ${({position}) => (position === 'right' ? '0 0 0 4px' : '0 4px 0 0')};
    }

    @media (max-width: ${Breakpoint.Mobile}px) {
        & > span {
            display: none;
        }
    }
`;

export const ButtonWithIcon: React.FC<PropsWithChildren<ButtonWithIconProps>> = ({
                                                                                     icon,
                                                                                     children,
                                                                                     onClick,
                                                                                     disabled,
                                                                                     position = 'left',
                                                                                     fullWidth,
                                                                                     ariaLabel
                                                                                 }) => {
    return (
        <StyledButton onClick={onClick} aria-label={ariaLabel} position={position} disabled={disabled}
                      fullWidth={fullWidth}>
            {position === 'left' && icon}
            <span>{children}</span>
            {position === 'right' && icon}
        </StyledButton>
    );
};


