import {useImageProvider} from "../../hooks";
import {ErrorMessage} from "../SuccessMessage/ErrorMessage.tsx";

export const ErrorSemaphore = () => {
    const {state: {error}} = useImageProvider()

    return error && <ErrorMessage message={error}/>
}