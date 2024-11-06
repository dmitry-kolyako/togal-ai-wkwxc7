import express, {Request, Response} from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure the images directory exists
const imagesDir = path.join(__dirname, '..', 'images');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagesDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const mimeType = allowedTypes.test(file.mimetype);
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimeType && extName) {
            cb(null, true);
        } else {
            cb(new Error('Only JPG and PNG files are allowed'));
        }
    }
});

// Endpoint to upload an image
app.post('/upload', upload.single('image'), (req: Request, res: Response): any => {
    if (req.file) {
        return res.status(200).json({
            message: 'Image uploaded successfully',
            filename: req.file.filename
        });

    } else {
        return res.status(400).json({error: 'No file uploaded'});

    }
});

// Endpoint to retrieve an uploaded image
app.get('/image/:filename', (req: Request, res: Response) => {
    const filePath = path.join(imagesDir, req.params.filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({error: 'Image not found'});
        }

        res.sendFile(filePath);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
