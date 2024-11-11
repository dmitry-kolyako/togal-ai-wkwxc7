const ServerPort = 5000
const ServerHost = 'http://localhost'
const BaseUrl = `${ServerHost}:${ServerPort}`

export type TApiConfig = {
    ServerHost: string
    ServerPort: number
    BaseUrl: string

    HistoryFileName: string
}

export const ApiConfig: TApiConfig = {
    ServerHost,
    ServerPort,
    BaseUrl,

    HistoryFileName: 'history.json',
}

export enum ApiEndpoints {
    UPLOAD = "/upload",
    IMAGE = "/image/:id",
    IMAGE_PREVIEW = "/image/:id/preview",
    REMOVE = "/image/:id",
    IMAGES = "/images",
}

export const AcceptedExtensions = [
    'jpeg', 'jpg', 'png'
]
export const AcceptedFileTypes = AcceptedExtensions.map(ext => `image/${ext}`)

export const AllowedTypesRegExp = new RegExp(AcceptedExtensions.join('|'), 'i');