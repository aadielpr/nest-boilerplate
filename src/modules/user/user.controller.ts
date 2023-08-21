import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller({
    path: 'users',
})
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async create() {
        return await this.userService.create();
    }
}
