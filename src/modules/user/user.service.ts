import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'providers/drizzle/drizzle.service';
import { users } from './user.schema';

@Injectable()
export class UserService {
    constructor(private drizzleService: DrizzleService) {}
    async create() {
        const data = await this.drizzleService.db.insert(users).values({ name: 'foo' }).returning();
        console.log(data);
        return data;
    }
}
