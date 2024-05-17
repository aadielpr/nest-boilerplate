import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from "config";
import { HttpExceptionFilter } from "filters";
import { HTTPLogInterceptor } from "interceptors";
import { UserModule } from "modules/user/user.module";

@Module({
    imports: [ConfigModule, UserModule],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: HTTPLogInterceptor,
        },
    ],
})
export class AppModule {}
