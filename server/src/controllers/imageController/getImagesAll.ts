import fs from "fs";
import {Request, Response} from "express";
import {UPLOADS_ROOT} from "../../middleware/imageUploadMiddleware";
import {ImageModel} from "../../../../shared/types/Image";
import {getImageModelById} from "./getImageModelById";

export const getImagesAll = async (req: Request, res: Response) => {
    try {
        const directories = await fs.promises.readdir(UPLOADS_ROOT)
        const images = await directories.reduce<Promise<Array<ImageModel>>>(
            async (mapHandler, id) => {
                const map = await mapHandler
                const model = await getImageModelById(id)

                if (model) {
                    map.push(model)
                }
                return map
            }, Promise.resolve([])
        )

        res.status(200).json(images.reverse());

    } catch (error) {
        console.error('Error retrieving routers:', error);
        res.status(500).json({message: 'Server error'});
    }
};
