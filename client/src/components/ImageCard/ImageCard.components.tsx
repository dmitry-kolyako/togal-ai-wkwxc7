import styled, {css} from "styled-components";

export const ImageCardFrame = styled('div').withConfig({
    shouldForwardProp: (prop) =>!['active'].includes(prop),
})<{ active: boolean }>`
    border: 1px solid #ccc;
    padding: 8px;
    width: 64px;
    height: 64px;
    cursor: pointer;
    display: flex;
    justify-content: center;

    ${({active}) =>
            active &&
            css`
                padding: 7px;
                border: 2px solid blue;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
            `}
`

export const ImageCardPic = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    
    justify-self: center;
    align-self: center;
`