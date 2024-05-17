import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class HTTPLogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const date = Date.now();
        const req = context.switchToHttp().getRequest<Request>();
        const res = context.switchToHttp().getResponse<Response>();
        const method = req.method;
        const url = req.url;

        return next
            .handle()
            .pipe(
                tap(() =>
                    Logger.log(
                        `${method} ${url} ${res.statusCode} ${Date.now() - date}ms`,
                        `${context.getClass().name}`,
                    ),
                ),
            );
    }
}
