import { HttpException, HttpStatus } from "@nestjs/common";
import { IApiError } from "./exception.interface";
import { createApiErrorBody } from "./exception.util";

export abstract class ApiException extends HttpException {
    constructor(apiError: IApiError) {
        super(createApiErrorBody(apiError), apiError.status);
    }
}

export class BadRequestException extends ApiException {
    constructor(readonly validation: Record<string, Array<string>>) {
        super({ status: HttpStatus.BAD_REQUEST, message: "Bad Request", validation });
    }
}

export class ConflictException extends ApiException {
    constructor() {
        super({ status: HttpStatus.CONFLICT, message: "Conflict" });
    }
}

export class ForbiddenException extends ApiException {
    constructor() {
        super({ status: HttpStatus.FORBIDDEN, message: "Forbidden" });
    }
}

export class InternalServerErrorException extends ApiException {
    constructor(error: any) {
        super({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            detail: error,
        });
    }
}

export class NotFoundException extends ApiException {
    constructor() {
        super({ status: HttpStatus.NOT_FOUND, message: "Not Found" });
    }
}

export class UnauthorizedException extends ApiException {
    constructor() {
        super({ status: HttpStatus.UNAUTHORIZED, message: "Unauthorized" });
    }
}
