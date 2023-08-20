import { Inject, Injectable } from '@nestjs/common';

import { NodePgDatabase } from 'drizzle-orm/node-postgres';
/* import { DRIZZLE_TOKEN } from 'providers/drizzle/drizzle.module'; */

/* import {} from "providers/drizzle/drizzle.module" */

/* import { db } from 'shared/db'; */
import { users } from './user.schema';
import { DrizzleService } from 'providers/drizzle/drizzle.service';

@Injectable()
export class UserService {
    constructor(private drizzleService: DrizzleService) {}
    async create() {
        const data = await this.drizzleService.db.insert(users).values({ name: 'foo' }).returning();
        console.log(data);
        return data;
    }
}
