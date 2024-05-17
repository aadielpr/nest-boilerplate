import { Module } from "@nestjs/common";
import { DrizzleModule } from "providers/drizzle/drizzle.module";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [DrizzleModule],
    providers: [UserService, UserRepository],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
