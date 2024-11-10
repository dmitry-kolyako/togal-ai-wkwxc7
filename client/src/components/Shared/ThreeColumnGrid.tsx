// ThreeColumnGrid.tsx
import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {CanvasSize} from "../../config/config.ts";

export const ThreeColumnGrid: React.FC<Props> = ({children: {Left, Center, Right}}) => {
    return (
        <GridContainer>
            <Column alignment="right">
                {Left}
            </Column>
            <Column alignment="center">
                {Center}
            </Column>
            <Column alignment="left">
                {Right}
            </Column>
        </GridContainer>
    );
};



const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 0.5fr ${CanvasSize.width}px 0.5fr;
    gap: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr; // Turns columns into rows on smaller screens
    }
`;

const Column = styled.div<{ alignment?: 'right' | 'left' | 'center' }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignment }) =>
    alignment === 'right' ? 'flex-end' :
        alignment === 'left' ? 'flex-start' :
            'center'};
  justify-content: flex-start;
`;


type Props = {
    children: {
        Left: ReactNode,
        Center: ReactNode,
        Right: ReactNode,
    }
}

