import React, {FC} from 'react';
import {
    HistoryContainer,
    HistoryDescription,
    HistoryItem,
    HistoryLabel,
    HistoryList
} from "./TransformationHistory.components.tsx";
import {useImageProvider} from "../../hooks";
import {Transformation, TransformationType} from "../../entities";
import {useTransformationControls} from "../../hooks/useTransformationControls.ts";

export const TransformationHistory: React.FC = () => {
    const {state: {transformationHistory, selectedTransformation}} = useImageProvider();
    const {
        actions: {setSelectedTransformation}
    } = useTransformationControls();

    return (
        <HistoryContainer>
            <h3>Transformation History</h3>
            <HistoryList>
                {transformationHistory.length === 0 ? (
                    <p>No transformations applied.</p>
                ) : (
                    <>
                        <HistoryItem key={-1}
                                     isActive={selectedTransformation === -1}
                                     onClick={() => setSelectedTransformation(-1)}
                        >
                            <HistoryLabel>{TransformationType.INITIAL}</HistoryLabel>
                            <HistoryDescription>
                                <TransformationDescription transformation={{
                                    type: TransformationType.INITIAL
                                }}/>
                            </HistoryDescription>
                        </HistoryItem>

                        {
                            transformationHistory.map((transformation, index) => (
                                <HistoryItem key={index}
                                             isActive={selectedTransformation === index}
                                             isHidden={index > selectedTransformation}
                                             onClick={() => setSelectedTransformation(index)}
                                >
                                    <HistoryLabel>{transformation.type}</HistoryLabel>
                                    <HistoryDescription>
                                        <TransformationDescription transformation={transformation}/>
                                    </HistoryDescription>
                                </HistoryItem>
                            ))
                        }

                    </>


                )}
            </HistoryList>
        </HistoryContainer>
    );
};

type TWithTranslation = { transformation: Transformation };
const TransformationDescription: FC<TWithTranslation> = ({transformation: {type, value}}) => {
    switch (type) {
        case TransformationType.INITIAL:
            return value ?? `Initial`
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
