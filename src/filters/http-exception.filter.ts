import type { ExceptionFilter } from "@nestjs/common";
import { ArgumentsHost, Catch, HttpException, Logger } from "@nestjs/common";
import { type Response } from "express";
import { throwError } from "rxjs";
import { InternalServerErrorException } from "../exceptions";

const logger = new Logger("HTTP_FILTER", { timestamp: true });

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const hostType = host.getType();

        if (hostType !== "http") {
            return throwError(() => exception.getResponse());
        }

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (!(exception instanceof HttpException)) {
            const internalServerError = new InternalServerErrorException(exception);
            logger.error(internalServerError.getResponse());

            return response
                .status(internalServerError.getStatus())
                .json(internalServerError.getResponse());
        }

        logger.error(exception.getResponse());

        return response.status(exception.getStatus()).json(exception.getResponse());
    }
}
