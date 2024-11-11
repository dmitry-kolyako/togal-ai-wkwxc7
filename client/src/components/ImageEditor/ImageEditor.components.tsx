import styled from "styled-components";
import {Breakpoint} from "../../config/theme.ts";

export const ImagePreview = styled.div`
    padding: 0 20px;
`

export const ImageActionsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    flex-direction: column;

    @media (max-width: ${Breakpoint.Mobile}px) {
        flex-direction: row;
    }
`;