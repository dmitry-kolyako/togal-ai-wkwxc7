import fs from "fs";
import {TransformationHistory} from "../../../shared/types/Transformation";

export const readHistoryFile = async (path: string) => {
    const data = await fs.promises.readFile(path, {encoding: 'utf8'});
    return JSON.parse(data) as TransformationHistory
}
