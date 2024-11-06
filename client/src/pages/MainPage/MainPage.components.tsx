import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: #f8f9fa;
`
export const Header = styled.div`
    width: 100%;
    padding: 1rem;
    text-align: center;
    background-color: #343a40;
    color: #ffffff;
`
export const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin-top: 2rem;
`
const SectionBase = styled.section`
    width: 100%;
    padding: 1rem;
    margin: 0.5rem 0;
`
const SectionJustifyCenter = styled(SectionBase)`
    display: flex;
    justify-content: center;
`

export const DisplaySection = styled(SectionJustifyCenter)`
    border: 1px solid #ddd;
    padding: 1rem;
    background-color: #fff;
`
export const ControlsSection = styled(SectionJustifyCenter)`
`
export const UploadSection = styled(SectionJustifyCenter)`
`