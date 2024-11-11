import fs from "fs";
import path from "path";
import {Request, Response} from "express";
import {UPLOADS_ROOT} from "../../config/storage";

export const deleteImage = (req: Request, res: Response): void => {
    const {id} = req.params;

    if (!id) {
        res.status(400).json({message: 'File id is required'});
        return;
    }

    // Construct the full path to the image file
    const filePath = path.join(UPLOADS_ROOT, id);

    // Check if the file exists, then delete it
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File not found:', filePath);
            res.status(404).json({message: 'File not found'});
            return;
        }

        // Delete the file
        fs.rm(filePath, { recursive: true }, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Failed to delete file:', unlinkErr);
                res.status(500).json({message: 'Failed to delete file'});
                return;
            }

            res.status(200).json({message: 'File deleted successfully'});
        });
    });
};
