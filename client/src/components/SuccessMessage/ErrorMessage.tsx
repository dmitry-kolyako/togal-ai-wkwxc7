// SuccessMessage.tsx
import React from 'react';
import {CornerMessage, CornerMessageProps, MessageType} from "./CornerMessage.tsx";

export const ErrorMessage: React.FC<CornerMessageProps> = (props) => (
    <CornerMessage {...props} type={MessageType.ERROR}/>
)