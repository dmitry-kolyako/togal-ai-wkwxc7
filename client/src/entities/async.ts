export enum AsyncActionKeys {
    GET_GALLERY,
    GET_IMAGE,
    UPLOAD_IMAGE,
    REMOVE_IMAGE,

}

export enum AsyncStatus {
    PROGRESS = 'PROGRESS',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export type AsyncAction = {
    action: AsyncActionKeys,
    status: AsyncStatus | null
}