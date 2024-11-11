import fs from "fs";

export const createDirectoryIfNotExists = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true});
    }

    return path
}
