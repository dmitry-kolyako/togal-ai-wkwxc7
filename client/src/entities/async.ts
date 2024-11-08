export enum AsyncStatus {
    PROGRESS = 'PROGRESS',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export type AsyncAction = {
    action: string,
    status: AsyncStatus | null
}