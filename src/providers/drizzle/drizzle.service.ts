import { Inject } from '@nestjs/common';

import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool, PoolConfig } from 'pg';
import { DRIZZLE_OPTIONS } from 'shared/constants';

export class DrizzleService {
    private readonly pgPool: Pool;
    private readonly drizzle: NodePgDatabase;

    constructor(@Inject(DRIZZLE_OPTIONS) options: PoolConfig) {
        this.pgPool = new Pool(options);
        this.drizzle = drizzle(this.pgPool, { logger: true });
    }

    get db() {
        return this.drizzle;
    }
}
