// SuccessMessage.tsx
import React from 'react';
import {CornerMessage, CornerMessageProps} from "./CornerMessage.tsx";
import {MessageType} from "./CornerMessage.types.ts";

export const ErrorMessage: React.FC<CornerMessageProps> = (props) => (
    <CornerMessage {...props} type={MessageType.ERROR}/>
)