import {Request, Response} from "express";
import {ImageModel} from "../../../../shared/types/Image";

export const uploadImage = (req: Request, res: Response<ImageModel | {
    message: string
}>) => {
    if (req.file) {
        res.status(200).json({
            id: (new Date()).toISOString(),
            url: req.file.filename,
            filename: req.file.filename,
        });

    } else {
        res.status(400).json({message: 'No file uploaded'});

    }
};