import path from "path";
import {createDirectoryIfNotExists} from "../utils/createDirectoryIfNotExists";

export const UPLOADS_ROOT = path.join(__dirname, '../..', 'storage');
export const HISTORY_DIR = 'history';

createDirectoryIfNotExists(UPLOADS_ROOT);
