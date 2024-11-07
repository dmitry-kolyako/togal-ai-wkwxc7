import React, {FC} from 'react';
import {
    HistoryContainer,
    HistoryDescription,
    HistoryItem,
    HistoryLabel,
    HistoryList
} from "./TransformationHistory.components.tsx";
import {useImageContext} from "../../hooks";
import {Transformation, TransformationType} from "../../entities";


export const TransformationHistory: React.FC = () => {
    const {state} = useImageContext();
    const {transformationHistory} = state;

    return (
        <HistoryContainer>
            <h3>Transformation History</h3>
            <HistoryList>
                {transformationHistory.length === 0 ? (
                    <p>No transformations applied.</p>
                ) : (
                    transformationHistory.map((transformation, index) => (
                        <HistoryItem key={index}>
                            <HistoryLabel>{transformation.type}</HistoryLabel>
                            <HistoryDescription>
                                <TransformationDescription transformation={transformation}/>
                            </HistoryDescription>
                        </HistoryItem>
                    ))
                )}
            </HistoryList>
        </HistoryContainer>
    );
};

const TransformationDescription: FC<{ transformation: Transformation }> = ({transformation: {type, value}}) => {
    switch (type) {
        case TransformationType.ROTATE_RIGHT:
            return value ?? `+90°`
        case TransformationType.ROTATE_LEFT:
            return value ?? `-90°`
        case TransformationType.ZOOM_IN:
            return value ?? `Zoomed In`
        case TransformationType.ZOOM_OUT:
            return value ?? `Zoomed Out`
        case TransformationType.RESET:
            return `Reset`
        default:
            return value ?? type
    }
}
