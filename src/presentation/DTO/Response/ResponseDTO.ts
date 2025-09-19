export interface ResponseDTO<T> {
    success: boolean;
    message: string;
    data: T;
}

export class SuccessResponse<T> implements ResponseDTO<T> {
    success = true;
    message: string;
    data: T;

    constructor(data: T, message = "Operation successful") {
        this.data = data;
        this.message = message;
    }
}

export class ErrorResponse<T = any> implements ResponseDTO<T> {
    success = false;
    message: string;
    data: T;

    constructor(trace: T, message?: string) {
        this.data = trace;
        // If message is provided, use it. Otherwise, if trace is string, use that as message.
        // Otherwise, default to a generic error message.
        if (message) {
            this.message = message;
        } else if (typeof trace === "string") {
            this.message = trace;
        } else {
            this.message = "An error occurred";
        }
    }
}
