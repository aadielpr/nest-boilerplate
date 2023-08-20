import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DrizzleModule } from "providers/drizzle/drizzle.module";

@Module({
    imports: [DrizzleModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
