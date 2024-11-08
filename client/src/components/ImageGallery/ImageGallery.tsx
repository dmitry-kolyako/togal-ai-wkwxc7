import {FC, useCallback, useEffect, useMemo} from 'react';
import {ImageCard} from "../ImageCard/ImageCard.tsx";
import {GalleryContainer, GalleryList} from "./ImageGallery.compnents.tsx";
import {useImageContext, useImageControls} from "../../hooks";
import {ImageModel} from "../../../../shared/types/Image.ts";
import {getFileFromUrl} from "../../utils/getFIleFromUrl.ts";


export const ImageGallery: FC = () => {
    const {
        selectedImage, setSelectedImage,
    } = useImageControls()

    const {
        state: {gallery}, api: {withLoading, loadImages}
    } = useImageContext()

    useEffect(() => {
        loadImages()
    }, [loadImages]);


    const imageCards = useMemo(() => gallery.map(
        (image) => {
            return {
                ...image,
            };
        }
    ), [gallery])

    const trackImageLoading = useMemo(() => withLoading('getFileFromUrl'), [withLoading])

    const handleSelected = useCallback(
        (image: ImageModel) => () => {
            trackImageLoading(
                getFileFromUrl(image)
            ).then(file => (setSelectedImage({
                ...image,
                file
            })))
        }, [setSelectedImage, trackImageLoading]
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
