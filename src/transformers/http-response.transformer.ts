import { HttpStatus } from "@nestjs/common";
import { HttpSuccessDto, THttpAccessToken } from "../types";

export class HttpResponse {
    static ok<T>(data: T, token: THttpAccessToken): HttpSuccessDto<T> {
        return new HttpSuccessDto({
            status: HttpStatus.OK,
            message: "Success",
            data,
            token,
        });
    }

    static accepted(token: THttpAccessToken): HttpSuccessDto<Record<string, never>> {
        return new HttpSuccessDto({
            status: HttpStatus.ACCEPTED,
            message: "Accepted",
            data: {},
            token,
        });
    }
}
