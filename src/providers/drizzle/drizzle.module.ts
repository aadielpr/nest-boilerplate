import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ApiConfigService } from 'config/api-config.service';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { DRIZZLE_OPTIONS } from 'shared/constants';
import { DrizzleService } from './drizzle.service';

@Module({
    providers: [
        {
            provide: DRIZZLE_OPTIONS,
            useFactory: (config: ApiConfigService) => config.pgConfig,
            inject: [ApiConfigService],
        },
        DrizzleService,
    ],
    exports: [DrizzleService],
})
export class DrizzleModule implements OnApplicationBootstrap {
    constructor(private drizzleService: DrizzleService) {}

    async onApplicationBootstrap() {
        await migrate(this.drizzleService.db, { migrationsFolder: 'drizzle' });
    }
}
