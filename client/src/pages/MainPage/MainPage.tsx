import {
    ControlsSection,
    DisplaySection,
    GallerySection,
    HistorySection,
    PageHeader,
    PageMain,
    UploadSection
} from "./MainPage.components.tsx";
import {ImageDisplay, ImageUpload, TransformationControls} from '../../components';
import {TransformationHistory} from "../../components/TransformationHistory/TransformationHistory.tsx";
import {ImageGallery} from "../../components/ImageGallery/ImageGallery.tsx";
import {PageContainer} from "../../components/Shared/PageContainer.tsx";
import {Debugger} from "../../components/Shared";
import {useImageContext} from "../../hooks";

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

                <div>
                    <div>
                        <Debugger {...useImageContext().state} />

                    </div>

                </div>
            </PageMain>
        </PageContainer>
    );
};
