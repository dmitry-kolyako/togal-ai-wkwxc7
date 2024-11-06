import {Container, ControlsSection, DisplaySection, Header, Main, UploadSection} from "./MainPage.components.tsx";
import {Controls, ImageDisplay, ImageUpload} from '../../components';

export const MainPage = () => {
    // src/components/MainLayout/MainLayout.js

    return (
        <Container>
            <Header>
                <h1>Image Uploader & Editor</h1>
            </Header>

            <Main>
                <UploadSection>
                    <ImageUpload/>
                </UploadSection>

                <DisplaySection>
                    <ImageDisplay/>
                </DisplaySection>

                <ControlsSection>
                    <Controls/>
                </ControlsSection>
            </Main>
        </Container>
    );
};
