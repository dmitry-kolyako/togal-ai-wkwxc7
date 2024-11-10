import {Router} from "express";
import {imageUploader} from "./imageUploader";
import {ApiEndpoints} from "../../../shared/config/api.config";
import {deleteImage, getImage, getImagesAll, storeImage} from "../controllers/imageController";

export const imagesRouter = Router()

// Endpoint to get single image contents
imagesRouter.get(ApiEndpoints.GET, getImage);

// Endpoint to get all images
imagesRouter.get(ApiEndpoints.IMAGES, getImagesAll);

// Endpoint to imagesUploader new image
imagesRouter.post(ApiEndpoints.UPLOAD, imageUploader.single('image'), storeImage);

// Endpoint to delete image
imagesRouter.delete(ApiEndpoints.GET, deleteImage)


