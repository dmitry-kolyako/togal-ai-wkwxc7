import multer from "multer";
import path from "path";

import {imageUploadMiddleware} from "../middleware/imageUploadMiddleware";
import {AllowedTypesRegExp} from "../../../shared/config/api.config";
import {Fields} from "../../../shared/types/Fields";

export const imageUploader = () => {
    const id = Date.now() + '-' + Math.round(Math.random() * 1e9);

    return multer({
        storage: imageUploadMiddleware(id),
        fileFilter: (req, file, cb) => {
            switch (file.fieldname) {
                case (Fields.Image):
                case (Fields.Transformed):
                    const mimeType = AllowedTypesRegExp.test(file.mimetype);
                    const extName = AllowedTypesRegExp.test(path.extname(file.originalname).toLowerCase());

                    if (mimeType && extName) {
                        cb(null, true);
                    } else {
                        cb(new Error('Only JPG and PNG files are allowed'));
                    }

                    break;
                case (Fields.History):
                    if (file.mimetype === 'application/json') {
                        cb(null, true);
                    } else {
                        cb(new Error('Wrong data format'));
                    }
                    break;
            }
        }
    });
}
