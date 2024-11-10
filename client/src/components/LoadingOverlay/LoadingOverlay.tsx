import {Modal} from "../Modal/Modal.tsx";
import {useAppUiState} from "../../hooks/useAppUiState.ts";
import {ProgressCircle} from "../Shared/ProgressCircle.tsx";

export const LoadingOverlay = () => {
    const {isLoading} = useAppUiState();
    return <Modal isOpen={isLoading}>
        <ProgressCircle size={100} />
    </Modal>
}