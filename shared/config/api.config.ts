const ServerPort = 5000
const ServerHost = 'http://localhost'
const BaseUrl = `${ServerHost}:${ServerPort}`

export type TApiConfig = {
    ServerHost: string
    ServerPort: number
    BaseUrl: string
}

export const ApiConfig: TApiConfig = {
    ServerHost,
    ServerPort,
    BaseUrl,
}

export enum ApiEndpoints {
    UPLOAD = "/upload",
    GET = "/image/:id",
    REMOVE = "/image/:id",
    IMAGES = "/images",
}

export const AcceptedExtensions = [
    'jpeg', 'jpg', 'png'
]
export const AcceptedFileTypes = AcceptedExtensions.map(ext => `image/${ext}`)

export const AllowedTypesRegExp = new RegExp(AcceptedExtensions.join('|'), 'i');