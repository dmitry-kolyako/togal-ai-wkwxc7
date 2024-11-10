import {Response} from "express";

type TWithMessage = Partial<{
    message: string
    code: number
}>

export const responseErrorDocument = <T extends TWithMessage>(res: Response, error: string, options?: T) => {
    const {
        code = 400,
        message,
        ...rest
    } = options || {};

    res.status(code).json({
        message: error || message, ...rest
    });

}