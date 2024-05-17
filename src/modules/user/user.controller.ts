import { Controller, Get } from "@nestjs/common";
import { HttpResponse } from "transformers";
import { UserService } from "./user.service";

@Controller({
    path: "users",
})
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async create() {
        const response = await this.userService.create();
        return HttpResponse.ok(response, { access: null });
    }
}
