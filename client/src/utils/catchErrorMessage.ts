export const catchErrorMessage = (error: unknown, message?: string) => {
    if (error instanceof Error && error.message) {
        return error.message
    } else {
        return message || 'Something went wrong'
    }
}