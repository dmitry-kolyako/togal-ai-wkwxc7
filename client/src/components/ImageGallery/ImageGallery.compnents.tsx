import styled from "styled-components";
import {Container} from "../Shared/Container.tsx";

export const GalleryContainer = styled(Container)`
    
    justify-content: center;
`

export const GalleryList = styled.div`
    padding: 0;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 10px;

    width: 100%;
    max-width: 660px;
    align-self: center;
    justify-content: left;
    
`;