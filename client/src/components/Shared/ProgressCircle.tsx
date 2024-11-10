import styled from "styled-components";
import {FC} from "react";

export const ProgressCircle: FC<{ size: number }> = ({size}) => (<Container>
    <SvgContainer height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        <CircleBg cx={size / 2} cy={size / 2} r={0.9 * size / 2}></CircleBg>
        <CircleAnimate cx={size / 2} cy={size / 2} r={0.9 * size / 2}></CircleAnimate>
    </SvgContainer>
</Container>)

const Container = styled.div`
    display: flex;
    position: relative;
    align-content: space-around;
    justify-content: center;
`

const SvgContainer = styled.svg`
`

const Circle = styled.circle`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    fill: none;
    stroke-width: 10px;
    stroke-linecap: round;
    stroke: rgb(0, 89, 148);
`

const CircleBg = styled(Circle)`
    stroke-width: 12px;
    stroke: rgb(216, 239, 255);
`

const CircleAnimate = styled(Circle)`
    stroke-dasharray: 242.6;
    animation: fill-animation 1s cubic-bezier(1, 1, 1, 1) 0s infinite;

    @keyframes fill-animation {
        0% {
            stroke-dasharray: 40 242.6;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 141.3;
            stroke-dashoffset: 141.3;
        }
        100% {
            stroke-dasharray: 40 242.6;
            stroke-dashoffset: 282.6;
        }
    }

`

