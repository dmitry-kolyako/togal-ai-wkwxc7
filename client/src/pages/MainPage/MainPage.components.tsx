import styled from "styled-components";
import {SectionCentered} from "../../components";

export const PageHeader = styled.div`
    width: 100%;
    padding: 1rem;
    text-align: center;
    background-color: #343a40;
    color: #ffffff;
`
export const PageMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin-top: 2rem;
`
export const DisplaySection = styled(SectionCentered)`
    border: 1px solid #ddd;
    background-color: #fff;
    padding: 20px 0;
`
export const UploadSection = styled(SectionCentered)``
export const HistorySection = styled(SectionCentered)``
export const GallerySection = styled(SectionCentered)``