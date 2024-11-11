import {Request, Response} from "express";
import {ImageModel} from "../../../../shared/types/Image";
import {responseErrorDocument} from "../errorController/resultErrorDocument";
import {createUrlFromRoute} from "../../../../shared/utils/createUrlFromRoute";
import {ApiConfig, ApiEndpoints} from "../../../../shared/config/api.config";
import {Fields} from "../../../../shared/types/Fields";
import {readHistoryFile} from "../../utils/readHistoryFile";

const {BaseUrl} = ApiConfig


export const storeImage = async (req: Request, res: Response<ImageModel | {
    message: string
}>) => {

    if (req.files && !(req.files instanceof Array)) {
        const {
            [Fields.Image]: [image],
            [Fields.Transformed]: [preview],
            [Fields.History]: [history]
        } = req.files

        console.log(req.files)

        if (image && history && preview) {
            const id = image.destination.split("/").pop();

            if (id) {
                res.status(200).json({
                    id,
                    url: BaseUrl + createUrlFromRoute(ApiEndpoints.IMAGE, {id}),
                    filename: image.filename,
                    history: await readHistoryFile(history.path)
                });

            } else {
                responseErrorDocument(res, 'File upload error')
            }

        } else {
            responseErrorDocument(res, 'No file uploaded')
        }

    } else {
        responseErrorDocument(res, 'Wrong files uploaded')
    }
};