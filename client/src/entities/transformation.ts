export enum TransformationType {
    INITIAL = 'INITIAL',
    ROTATE_RIGHT = 'ROTATE_RIGHT',
    ROTATE_LEFT = 'ROTATE_LEFT',
    RESET = 'RESET',
    ZOOM_IN = 'ZOOM_IN',
    ZOOM_OUT = 'ZOOM_OUT',
}

export type Transformation = {
    type: TransformationType;
    value?: string;
};