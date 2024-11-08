import fs from "fs";
import path from "path";
import {Request, Response} from "express";
import {UPLOADS_ROOT} from "../../middleware/imageUploadMiddleware";
import {AllowedTypesRegExp, ApiConfig, ApiEndpoints} from "../../../../shared/config/api.config";
import {createUrlFromRoute} from "../../utils/createUrlFromRoute";

const {BaseUrl} = ApiConfig

export const getImagesAll = async (req: Request, res: Response) => {
    try {
        const directories = await fs.promises.readdir(UPLOADS_ROOT)
        const images = directories.filter(
            async dir => {
                const imageDir = `${UPLOADS_ROOT}/${dir}`;
                const images = (await fs.promises.readdir(imageDir)).filter((file) => AllowedTypesRegExp.test(file));
                const count = images.length;
                return count > 0;
            }
        )

        res.status(200).json(images.map((id) => ({
            id,
            filename: id,
            url: BaseUrl + createUrlFromRoute(ApiEndpoints.IMAGE, {id})
        })));

    } catch (error) {
        console.error('Error retrieving images:', error);
        res.status(500).json({message: 'Server error'});
    }
};
