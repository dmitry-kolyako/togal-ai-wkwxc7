import fs from "fs";
import path from "path";
import {Request, Response} from "express";
import {readAllowedImages} from "../../utils/readAllowedImages";
import {HISTORY_DIR, UPLOADS_ROOT} from "../../config/storage";

export const getImage = async (req: Request, res: Response) => {
    const imageDir = path.join(UPLOADS_ROOT, req.params.id);
    const [image] = await readAllowedImages(imageDir);
    const imageSrc = path.join(imageDir, image);

    getImageBody(imageSrc, req, res)
}

export const getImagePreview = async (req: Request, res: Response) => {
    const imageDir = path.join(UPLOADS_ROOT, req.params.id, HISTORY_DIR);
    const [image] = await readAllowedImages(imageDir);
    const imageSrc = path.join(imageDir, image);

    getImageBody(imageSrc, req, res)
}

export const getImageBody = async (imageSrc: string,req: Request, res: Response) => {
    try {
        fs.access(imageSrc, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).json({message: 'Image not found'});
            }
            res.status(200).sendFile(imageSrc);
        });
    } catch (err) {
        res.status(404).json({message: 'Image not found'});
    }

}