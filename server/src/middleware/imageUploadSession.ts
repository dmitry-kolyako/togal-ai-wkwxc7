import {NextFunction, Request, Response} from "express";
import {createUid} from "../../../shared/utils/createUid";

const UPLOAD_SESSION = String('__uploadSession_' + createUid());

type TSession = {
    imageUid: string
}

export const imageUploadSession = (req: Request, res: Response, next: NextFunction) => {
    const sessionVar = {
        imageUid: createUid()
    };

    req.query = {
        ...req.query,
        [UPLOAD_SESSION]: sessionVar
    }
    next();
};

export const getImageUploadSession = (req: Request): TSession => {
    const {[UPLOAD_SESSION]: session} = req.query
    return session as TSession
}
