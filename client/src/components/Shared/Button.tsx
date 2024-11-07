import styled, {css} from "styled-components";

export const Button = styled.button`
    ${({ disabled }) =>
            disabled &&
            css`
                opacity: 0.5;
                cursor: not-allowed;
            `}

`;