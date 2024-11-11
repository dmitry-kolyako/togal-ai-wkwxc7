import {Router} from "express";
import {imageUploader} from "./imageUploader";
import {ApiEndpoints} from "../../../shared/config/api.config";
import {deleteImage, getImage, getImagePreview, getImagesAll, storeImage} from "../controllers/imageController";
import {Fields} from "../../../shared/types/Fields";

export const imagesRouter = Router()

// Endpoint to get single image contents
imagesRouter.get(ApiEndpoints.IMAGE, getImage);
imagesRouter.get(ApiEndpoints.IMAGE_PREVIEW, getImagePreview);

// Endpoint to get all images
imagesRouter.get(ApiEndpoints.IMAGES, getImagesAll);

// Endpoint to imagesUploader new image
imagesRouter.post(ApiEndpoints.UPLOAD, imageUploader().fields([{
    name: Fields.Image, maxCount: 1
}, {
    name: Fields.Transformed, maxCount: 1
}, {
    name: Fields.History, maxCount: 1
}]), storeImage);

// Endpoint to delete image
imagesRouter.delete(ApiEndpoints.IMAGE, deleteImage)


