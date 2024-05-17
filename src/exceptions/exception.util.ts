import { utcNow } from "../utils";
import { IApiError } from "./exception.interface";

export function createApiErrorBody(apiError: IApiError) {
    return {
        ok: false,
        status: apiError.status,
        message: apiError.message,
        timestamp: utcNow().toISOString(),
        validation: apiError.validation || null,
        detail: apiError.detail || null,
    };
}
