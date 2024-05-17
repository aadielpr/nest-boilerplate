import { THttpAccessToken } from "./http-access-token";
import { PageDto } from "./page.dto";

type HttpSuccessData<T> = T extends Array<infer U> ? PageDto<U> : T;

export class HttpSuccessDto<T> {
    ok: true;
    status: number;
    message: string;
    data: HttpSuccessData<T>;
    token: THttpAccessToken;

    constructor({
        data,
        status,
        message,
        token,
    }: {
        data: T | PageDto<T>;
        status: number;
        message: string;
        token: THttpAccessToken;
    }) {
        this.ok = true;
        this.status = status;
        this.message = message;
        this.data = data as HttpSuccessData<T>;
        this.token = token;
    }
}
