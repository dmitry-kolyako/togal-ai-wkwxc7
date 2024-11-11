import path from "path";
import {Request, Response} from "express";
import {readAllowedImages} from "../../utils/readAllowedImages";
import {HISTORY_DIR, UPLOADS_ROOT} from "../../config/storage";
import {sendImageBodyByPath, sendImageModelById} from "./sendImage";

export const getImage = async (req: Request, res: Response) => {
    const imageDir = path.join(UPLOADS_ROOT, req.params.id);
    const [image] = await readAllowedImages(imageDir);
    const imageSrc = path.join(imageDir, image);

    sendImageBodyByPath(imageSrc, res)
}

export const getImagePreview = async (req: Request, res: Response) => {
    const imageDir = path.join(UPLOADS_ROOT, req.params.id, HISTORY_DIR);
    const [image] = await readAllowedImages(imageDir);
    const imageSrc = path.join(imageDir, image);

    sendImageBodyByPath(imageSrc, res)
}

export const getImageModel = async (req: Request, res: Response) => {
    const imageUid = req.params.id;

    sendImageModelById(imageUid, res)
}

