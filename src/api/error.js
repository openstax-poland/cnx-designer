/**
 * Exception thrown by methods of {@link Storage} on API errors.
 */
export default class APIError extends Error {
    /**
     * Status code for the failed request.
     */
    get status() {
        throw new Error("not implemented")
    }

    /**
     * Status text for the failed request.
     */
    get statusText() {
        throw new Error("not implemented")
    }
}
