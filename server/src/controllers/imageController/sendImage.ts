import {Response} from "express";
import fs from "fs";
import {getImageModelById} from "./getImageModelById";
import {responseErrorDocument} from "../errorController/resultErrorDocument";

export const sendImageBodyByPath = async (imageSrc: string, res: Response) => {
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

export const sendImageModelById = async (imageUid: string, res: Response) => {
    const model = await getImageModelById(imageUid);
    if (model) {
        res.status(200).json(model);
    } else {
        responseErrorDocument(res, 'File read error')
    }

}