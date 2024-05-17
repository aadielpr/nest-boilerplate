import { Inject, Logger, Module, OnApplicationShutdown } from "@nestjs/common";
import { ConfigService } from "config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { DRIZZLE_CLIENT, PG_CONNECTION } from "./drizzle.constant";

const logger = new Logger(PG_CONNECTION, { timestamp: true });

@Module({
    providers: [
        {
            provide: PG_CONNECTION,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const pgConnection = new Client({
                    connectionString: configService.get("POSTGRES_URI"),
                });

                await pgConnection.connect();
                logger.log(`Postgres client connected`);

                return pgConnection;
            },
        },
        {
            provide: DRIZZLE_CLIENT,
            inject: [PG_CONNECTION, ConfigService],
            useFactory: (pgConnection: Client, configService: ConfigService) => {
                return drizzle(pgConnection, {
                    logger: configService.get("QUERY_LOGGER"),
                });
            },
        },
    ],
    exports: [DRIZZLE_CLIENT],
})
export class DrizzleModule implements OnApplicationShutdown {
    constructor(@Inject(PG_CONNECTION) private readonly connection: Client) {}

    async onApplicationShutdown() {
        await this.connection.end();
        logger.log("Closing postgres connection");
    }
}
