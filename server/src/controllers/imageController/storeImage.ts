import {Request, Response} from "express";
import {ImageModel} from "../../../../shared/types/Image";
import {responseErrorDocument} from "../errorController/resultErrorDocument";
import {Fields} from "../../../../shared/types/Fields";
import {getImageModelById} from "./getImageModelById";
import {getImageUploadSession} from "../../middleware/imageUploadSession";

export const storeImage = async (req: Request, res: Response<ImageModel | {
    message: string
}>) => {

    if (req.files && !(req.files instanceof Array)) {
        const {
            [Fields.Image]: [image],
            [Fields.Transformed]: [preview],
            [Fields.History]: [history]
        } = req.files

        if (image && history && preview) {

            const {imageUid} = getImageUploadSession(req)

            if (imageUid) {
                const model = await getImageModelById(imageUid);
                if (model) {
                    res.status(200).json(model);
                } else {
                    responseErrorDocument(res, 'File read error')
                }
            } else {
                responseErrorDocument(res, 'File upload error')
            }
        } else {
            responseErrorDocument(res, 'Not all files uploaded')
        }
    } else {
        responseErrorDocument(res, 'No files uploaded')
    }
};