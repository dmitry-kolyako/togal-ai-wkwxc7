import {Request, Response} from "express";
import {ImageModel} from "../../../../shared/types/Image";
import {responseErrorDocument} from "../errorController/resultErrorDocument";
import {Fields} from "../../../../shared/types/Fields";
import {getImageUploadSession} from "../../middleware/imageUploadSession";
import {sendImageModelById} from "./sendImage";

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
                await sendImageModelById(imageUid, res)

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