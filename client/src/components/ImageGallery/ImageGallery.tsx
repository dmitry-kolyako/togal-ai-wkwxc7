import {FC} from 'react';
import {ImageCard} from "../ImageCard/ImageCard.tsx";
import {GalleryContainer, GalleryList} from "./ImageGallery.compnents.tsx";
import {useGalleryControls} from "../../hooks";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog.tsx";

export const ImageGallery: FC = () => {
    const {
        actions: {handleSelect},
        state: {gallery, selectedImage, confirmationDialog}
    } = useGalleryControls()

    return (
        <GalleryContainer>
            <h3>Images Saved</h3>

            {gallery.length === 0 ? (
                <p>No images stored on server.</p>
            ) : (
                <GalleryList>
                    {
                        gallery.map((image) => (
                            <ImageCard
                                key={image.id}
                                isActive={image.id === selectedImage?.id}
                                onClick={handleSelect(image)}
                                image={image}
                            />
                        ))
                    }
                </GalleryList>
            )}


            <ConfirmationDialog
                title={"Update Image Confirmation"}
                {...confirmationDialog}
            />
        </GalleryContainer>
    );
};
