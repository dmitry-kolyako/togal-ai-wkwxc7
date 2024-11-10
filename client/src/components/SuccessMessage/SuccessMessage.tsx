// SuccessMessage.tsx
import React from 'react';
import {CornerMessage, CornerMessageProps, MessageType} from "./CornerMessage.tsx";

export const SuccessMessage: React.FC<CornerMessageProps> = (props) => (
    <CornerMessage {...props} type={MessageType.SUCCESS}/>
)