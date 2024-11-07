import {ImageModel} from "../../entities";
import {ImageCardFrame, ImageCardPic} from "./ImageCard.components.tsx";

interface ImageCardProps {
    isActive: boolean;
    image: ImageModel;
    onClick: () => void
}


export const ImageCard: React.FC<ImageCardProps> = ({ image: { url }, isActive, onClick }) => {
    const handleImageClick = () => {
        onClick();
    };

    return (
        <ImageCardFrame onClick={handleImageClick} active={Boolean(isActive)}>
            <ImageCardPic src={url} />
        </ImageCardFrame>
    );
};


