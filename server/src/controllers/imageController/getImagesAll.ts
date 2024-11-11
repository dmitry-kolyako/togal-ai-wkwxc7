import fs from "fs";
import path from "path";
import {Request, Response} from "express";
import {UPLOADS_ROOT} from "../../middleware/imageUploadMiddleware";
import {AllowedTypesRegExp, ApiConfig, ApiEndpoints} from "../../../../shared/config/api.config";
import {createUrlFromRoute} from "../../../../shared/utils/createUrlFromRoute";
import {ImageModel} from "../../../../shared/types/Image";
import {readHistoryFile} from "../../utils/readHistoryFile";
import {readAllowedImages} from "../../utils/readAllowedImages";


const {BaseUrl} = ApiConfig

export const getImagesAll = async (req: Request, res: Response) => {
    try {
        const directories = await fs.promises.readdir(UPLOADS_ROOT)
        const images = await directories.reduce<Promise<Array<ImageModel>>>(
            async (mapHandler, id) => {
                const map = await mapHandler
                const imageDir = `${UPLOADS_ROOT}/${id}`;
                const [filename] = await readAllowedImages(imageDir);

                if (filename) {
                    const historyPath = path.join(imageDir, ApiConfig.HistoryFileName);
                    const history = await readHistoryFile(historyPath);
                    const url = BaseUrl + createUrlFromRoute(ApiEndpoints.IMAGE, {id});
                    const preview_url = BaseUrl + createUrlFromRoute(ApiEndpoints.IMAGE_PREVIEW, {id});

                    console.log({ history, historyPath, imageDir, url })

                    map.push({
                        id,
                        filename,
                        url,
                        preview_url,
                        history
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
