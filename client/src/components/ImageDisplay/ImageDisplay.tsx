import {useImageContext} from "../../hooks/useImageContext.tsx";
import {Debugger} from "../Shared/Debugger.tsx";

export const ImageDisplay = () => {
    const {state: {gallery}} = useImageContext()

    return <div>
        <div>

            ImageDisplay.tsx
        </div>
        <div>

            <Debugger {...{gallery}}/>
        </div>
    </div>
}