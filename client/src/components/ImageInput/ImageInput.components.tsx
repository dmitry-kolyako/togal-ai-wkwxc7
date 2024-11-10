import styled from "styled-components";
import {Button} from "../Shared";

export const HiddenFileInput = styled.input`
    display: none;
`;

export const ClearButton = styled(Button)`
    background: #fff;
    width: 100%;
    padding: 2rem 1rem;
    font-size: 1.2rem;
    border-color: #4a90e2;
    border-width: 2px;
    
    &:hover {
        border-color: #4a90e2;
        background-color: #f0f8ff;
        
    }
`;