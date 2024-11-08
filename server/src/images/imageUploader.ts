import multer from "multer";
import path from "path";

import {imageUploadMiddleware} from "../middleware/imageUploadMiddleware";
import {AllowedTypesRegExp} from "../../../shared/config/api.config";

export const imageUploader = multer({
    storage: imageUploadMiddleware,
    fileFilter: (req, file, cb) => {
        console.log({file});

        const mimeType = AllowedTypesRegExp.test(file.mimetype);
        const extName = AllowedTypesRegExp.test(path.extname(file.originalname).toLowerCase());

        console.log({ mimeType, extName, file })

        if (mimeType && extName) {
            cb(null, true);
        } else {
            cb(new Error('Only JPG and PNG files are allowed'));
        }
    }
});