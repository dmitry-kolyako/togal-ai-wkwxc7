import {Request, Response} from "express";
import {ImageModel} from "../../../../shared/types/Image";
import {responseErrorDocument} from "../errorController/resultErrorDocument";
import {createUrlFromRoute} from "../../../../shared/utils/createUrlFromRoute";
import {ApiConfig, ApiEndpoints} from "../../../../shared/config/api.config";

const {BaseUrl} = ApiConfig

export const storeImage = (req: Request, res: Response<ImageModel | {
    message: string
}>) => {

    if (req.file) {
        console.log(req)
        const id = req.file.destination.split("/").pop();

        if (id) {

            res.status(200).json({
                id,
                url: BaseUrl + createUrlFromRoute(ApiEndpoints.GET, {id}),
                filename: req.file.filename,
            });

        } else {
            responseErrorDocument(res, 'File upload error')
        }

    } else {
        responseErrorDocument(res, 'No file uploaded')
    }
};