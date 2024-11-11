import {useCallback} from "react";
import {AsyncAction, AsyncActionKeys, AsyncStatus} from "../entities";
import {ImageAction, ImageActionType} from "../state";

export const useImageProviderActions = (dispatch: React.Dispatch<ImageAction>) => {

    const setLoading = useCallback((payload: AsyncAction) => {
        dispatch({type: ImageActionType.SET_LOADING, payload});
    }, [dispatch])

    const setError = useCallback((message: string | null) => {
        dispatch({type: ImageActionType.SET_ERROR, payload: message});
    }, [dispatch])

    const clearError = useCallback(() => {
        dispatch({type: ImageActionType.SET_ERROR, payload: null});
    }, [dispatch])

    const catchError = useCallback((error: unknown) => {
        if (error instanceof Error) setError(error.message);
    }, [setError])

    const withAsyncProgress = useCallback((action: AsyncActionKeys) => function <T>(promise: Promise<T>): Promise<T> {
        setLoading({action, status: AsyncStatus.PROGRESS})
        setError(null)
        return promise
            .then(
                result => {
                    setLoading({action, status: AsyncStatus.SUCCESS})
                    return result
                },
                error => {
                    setLoading({action, status: AsyncStatus.ERROR})
                    catchError(error)
                    throw error
                }
            )

    }, [setLoading, catchError, setError])

    return {
        setLoading, setError, clearError, catchError, withAsyncProgress,
    }

}