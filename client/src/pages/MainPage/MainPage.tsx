import {
    ControlsSection,
    DisplaySection,
    GallerySection,
    HistorySection,
    PageHeader,
    PageMain,
    UploadSection
} from "./MainPage.components.tsx";
import {TransformationControls, ImageDisplay, ImageUpload} from '../../components';
import {TransformationHistory} from "../../components/TransformationHistory/TransformationHistory.tsx";
import {ImageGallery} from "../../components/ImageGallery/ImageGallery.tsx";
import {PageContainer} from "../../components/Shared/PageContainer.tsx";

export const MainPage = () => {
    return (
        <PageContainer>
            <PageHeader>
                <h1>Image Uploader & Editor</h1>
            </PageHeader>

            <PageMain>
                <UploadSection>
                    <ImageUpload/>
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
