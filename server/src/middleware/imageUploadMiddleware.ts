// Configure Multer uploadMiddleware
import path from "path";
import multer from "multer";
import {Fields} from "../../../shared/types/Fields";
import {createDirectoryIfNotExists} from "../utils/createDirectoryIfNotExists";
import {getImageUploadSession} from "./imageUploadSession";
import {HISTORY_DIR, UPLOADS_ROOT} from "../config/storage";

export const makeImageDirectory = (id: string) => {
    const imageDir = createDirectoryIfNotExists(path.join(UPLOADS_ROOT, id));
    const historyDir = createDirectoryIfNotExists(path.join(imageDir, HISTORY_DIR));
    return {imageDir, historyDir}
}


export const imageUploadMiddleware = multer.diskStorage({
    destination: (req, file, cb) => {
        const {imageUid} = getImageUploadSession(req)
        const {imageDir, historyDir} = makeImageDirectory(imageUid);
        const dir = file.fieldname === Fields.Image ? imageDir : historyDir;
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});
