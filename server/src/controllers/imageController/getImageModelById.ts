import path from "path";
import {makeImageDirectory} from "../../middleware/imageUploadMiddleware";
import {readAllowedImages} from "../../utils/readAllowedImages";
import {readHistoryFile} from "../../utils/readHistoryFile";
import {createUrlFromRoute} from "../../../../shared/utils/createUrlFromRoute";
import {ApiConfig, ApiEndpoints} from "../../../../shared/config/api.config";
import {ImageModel} from "../../../../shared/types/Image";

const {BaseUrl, HistoryFileName} = ApiConfig
export const getImageModelById = async (id: string): Promise<ImageModel | null> => {
    if (id) {
        const {imageDir, historyDir} = makeImageDirectory(id);
        const [filename] = await readAllowedImages(imageDir);

        if (filename) {
            const historyPath = path.join(historyDir, HistoryFileName);
            const history = await readHistoryFile(historyPath);
            const url = BaseUrl + createUrlFromRoute(ApiEndpoints.IMAGE, {id});
            const preview_url = BaseUrl + createUrlFromRoute(ApiEndpoints.IMAGE_PREVIEW, {id});

            return {
                id,
                filename,
                url,
                preview_url,
                history
            }
        }
    }

    return null;
}