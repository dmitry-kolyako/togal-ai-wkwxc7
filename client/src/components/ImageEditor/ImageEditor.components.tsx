import styled from "styled-components";
import {CanvasSize} from "../../config/config.ts";

export const ImagePreview = styled.div`
    min-width: ${CanvasSize.width}px;
`

export const ImageActionButton = styled.button`
    padding: 10px 15px;
    font-size: 14px;
    cursor: pointer;
`