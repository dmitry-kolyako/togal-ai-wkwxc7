// SuccessMessage.tsx
import React from 'react';
import {MessageType} from "./CornerMessage.types.ts";
import {CornerMessage, CornerMessageProps} from "./CornerMessage.tsx";

export const SuccessMessage: React.FC<CornerMessageProps> = (props) => (
    <CornerMessage {...props} type={MessageType.SUCCESS}/>
)