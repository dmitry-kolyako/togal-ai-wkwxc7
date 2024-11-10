import {FC} from 'react';
import {ImageCard} from "../ImageCard/ImageCard.tsx";
import {GalleryContainer, GalleryList} from "./ImageGallery.compnents.tsx";
import {useGalleryControls} from "../../hooks";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog.tsx";

export const ImageGallery: FC = () => {
    const {
        actions: {handleSelected},
        state: {gallery, selectedImage, confirmationDialog}
    } = useGalleryControls()

    return (
        <GalleryContainer>
            <h3>Images Saved</h3>
            <GalleryList>
                {gallery.length === 0 ? (
                    <p>No images stored.</p>
                ) : (
                    gallery.map((image) => (
                        <ImageCard
                            key={image.id}
                            onClick={handleSelected(image)}
                            image={image} isActive={image.id === selectedImage?.id}/>
                    ))
                )}
            </GalleryList>

            <ConfirmationDialog
                title={"Update Image Confirmation"}
                {...confirmationDialog}
            />
        </GalleryContainer>
    );
};
