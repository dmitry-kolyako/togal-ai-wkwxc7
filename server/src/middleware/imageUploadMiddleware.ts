// Configure Multer uploadMiddleware
import fs from "fs";
import path from "path";
import multer from "multer";
import {Fields} from "../../../shared/types/Fields";

export const UPLOADS_ROOT = path.join(__dirname, '../..', 'images');
export const HISTORY_DIR = 'history';

if (!fs.existsSync(UPLOADS_ROOT)) {
    fs.mkdirSync(UPLOADS_ROOT);
}

const makeDirectory = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    return path
}


export const makeImageDirectory = (id: string) => {
    const imageDir = makeDirectory(`${UPLOADS_ROOT}/${id}`);
    const historyDir = makeDirectory(`${imageDir}/${HISTORY_DIR}`);
    return {imageDir, historyDir}
}

export const imageUploadMiddleware = (id: string) => multer.diskStorage({
    destination: (req, file, cb) => {
        const {imageDir, historyDir} = makeImageDirectory(id);
        const dir = file.fieldname === Fields.Image ? imageDir : historyDir;
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});
