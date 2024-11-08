import fs from "fs";
import path from "path";
import {Request, Response} from "express";
import {UPLOADS_ROOT} from "../../middleware/imageUploadMiddleware";

export const getImage = async (req: Request, res: Response) => {
    try {
        const imageDir = path.join(UPLOADS_ROOT, req.params.id);
        const [file] = await fs.promises.readdir(imageDir);
        const fileSrc = path.join(imageDir, file);

        fs.access(fileSrc, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).json({message: 'Image not found'});
            }
            res.status(200).sendFile(fileSrc);
        });
    } catch (err) {
        res.status(404).json({message: 'Image not found'});
    }
}


