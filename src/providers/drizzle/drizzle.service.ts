import { Inject } from '@nestjs/common';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool, PoolConfig } from 'pg';
import { DRIZZLE_OPTIONS } from 'shared/constants';


export class DrizzleService {
    private readonly pgPool: Pool;

    constructor(@Inject(DRIZZLE_OPTIONS) options: PoolConfig) {
        this.pgPool = new Pool(options);
    }

    get db() {
        return drizzle(this.pgPool, { logger: true });
    }
}
