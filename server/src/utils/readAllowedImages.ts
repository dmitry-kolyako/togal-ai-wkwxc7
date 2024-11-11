import fs from "fs";
import {TransformationHistory} from "../../../shared/types/Transformation";
import {AllowedTypesRegExp} from "../../../shared/config/api.config";

export const readAllowedImages = async (path: string) => {
    const images = await fs.promises.readdir(path);
    return images.filter((file) => AllowedTypesRegExp.test(file));
}
