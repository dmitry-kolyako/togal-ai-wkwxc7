import {Router} from "express";
import {imageUploader} from "../middleware/imageUploader";
import {ApiEndpoints} from "../../../shared/config/api.config";
import {deleteImage, getImage, getImagePreview, getImagesAll, storeImage} from "../controllers/imageController";
import {imageUploadSession} from "../middleware/imageUploadSession";


export const imagesRouter = Router()

// Endpoint to get single image contents
imagesRouter.get(ApiEndpoints.IMAGE, getImage);
imagesRouter.get(ApiEndpoints.IMAGE_PREVIEW, getImagePreview);

// Endpoint to get all routers
imagesRouter.get(ApiEndpoints.IMAGES, getImagesAll);

// Endpoint to imagesUploader new image
imagesRouter.post(ApiEndpoints.UPLOAD, [imageUploadSession, imageUploader, storeImage]);

// Endpoint to delete image
imagesRouter.delete(ApiEndpoints.IMAGE, deleteImage)


