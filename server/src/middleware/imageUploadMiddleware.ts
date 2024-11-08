// Configure Multer uploadMiddleware
import fs from "fs";
import path from "path";
import multer from "multer";

export const UPLOADS_ROOT = path.join(__dirname, '../..', 'images');

if (!fs.existsSync(UPLOADS_ROOT)) {
    fs.mkdirSync(UPLOADS_ROOT);
}

const makeImageDirectory = (id: string) => {
    const imageDir = `${UPLOADS_ROOT}/${id}`
    if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir);
    }

    return imageDir
}

export const imageUploadMiddleware = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, makeImageDirectory(id));
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});
