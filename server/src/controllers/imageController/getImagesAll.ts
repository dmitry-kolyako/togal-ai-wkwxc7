import fs from "fs";
import {Request, Response} from "express";
import {UPLOADS_ROOT} from "../../middleware/imageUploadMiddleware";
import {AllowedTypesRegExp, ApiConfig, ApiEndpoints} from "../../../../shared/config/api.config";
import {createUrlFromRoute} from "../../../../shared/utils/createUrlFromRoute";
import {ImageModel} from "../../../../shared/types/Image";

const {BaseUrl} = ApiConfig

export const getImagesAll = async (req: Request, res: Response) => {
    try {
        const directories = await fs.promises.readdir(UPLOADS_ROOT)
        const images = await directories.reduce<Promise<Array<ImageModel>>>(
            async (mapHandler, id) => {
                const map = await mapHandler
                const imageDir = `${UPLOADS_ROOT}/${id}`;
                const files = await fs.promises.readdir(imageDir);

                const [filename] = files.filter((file) => AllowedTypesRegExp.test(file));
                if (filename) {
                    map.push({
                        id,
                        filename,
                        url: BaseUrl + createUrlFromRoute(ApiEndpoints.GET, {id})
                    })
                }
                return map
            }, Promise.resolve([])
        )

        res.status(200).json(images.reverse());

    } catch (error) {
        console.error('Error retrieving images:', error);
        res.status(500).json({message: 'Server error'});
    }
};
