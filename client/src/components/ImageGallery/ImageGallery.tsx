import {FC, useCallback, useMemo} from 'react';
import {ImageModel} from "../../entities";
import {ImageCard} from "../ImageCard/ImageCard.tsx";
import {GalleryContainer, GalleryList} from "./ImageGallery.compnents.tsx";
import {useImageContext, useImageControls} from "../../hooks";

// interface ImageGalleryProps {
//     images: ImageModel[];
//     imageSelected: ImageModel;
//     onSelect: (image: ImageModel) => void;
// }

export const ImageGallery: FC = () => {
    const {
        selectedImage, selectImage,
    } = useImageControls()

    const {
        state: {gallery},
    } = useImageContext()


    const imageCards = useMemo(() => gallery.map(
        (image) => {
            const imageUrl = image.url;
            const imageBlob = image.blob;
            return {
                ...image,
                url: imageUrl || URL.createObjectURL(imageBlob),
            };
        }
    ), [gallery])

    const handleSelected = useCallback(
        (image: ImageModel) => () => {
            selectImage(image)
        }, [selectImage]
    )

    return (

        <GalleryContainer>
            <h3>Images Saved</h3>

            <GalleryList>

                {imageCards.length === 0 ? (
                    <p>No images stored.</p>
                ) : (
                    imageCards.map((image) => (
                        <ImageCard
                            key={image.id}
                            onClick={handleSelected(image)}
                            image={image} isActive={image.id === selectedImage?.id}/>
                    ))
                )}
            </GalleryList>
        </GalleryContainer>
    );
};
