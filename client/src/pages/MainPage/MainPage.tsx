import {
    DisplaySection,
    GallerySection,
    HistorySection,
    PageHeader,
    PageMain,
    UploadSection
} from "./MainPage.components.tsx";
import {ImageEditor, ImageGallery, ImageInput, PageContainer, TransformationHistory} from '../../components';

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

                <DisplaySection>
                    <ImageEditor/>
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
