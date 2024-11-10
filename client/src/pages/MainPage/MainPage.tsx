import {
    ControlsSection,
    DisplaySection,
    GallerySection,
    HistorySection,
    PageHeader,
    PageMain,
    UploadSection
} from "./MainPage.components.tsx";
import {
    ImageDisplay, ImageGallery,
    ImageInput,
    PageContainer,
    TransformationControls,
    TransformationHistory
} from '../../components';

export const MainPage = () => {
    return (
        <PageContainer>
            <PageHeader>
                <h1>Image Uploader & Editor</h1>
            </PageHeader>

            <PageMain>
                <UploadSection>
                    <ImageInput/>
                </UploadSection>

                <ControlsSection>
                    <TransformationControls/>
                </ControlsSection>

                <DisplaySection>
                    <ImageDisplay/>
                </DisplaySection>

                <HistorySection>
                    <TransformationHistory/>
                </HistorySection>

                <GallerySection>
                    <ImageGallery/>
                </GallerySection>

            </PageMain>
        </PageContainer>
    );
};
