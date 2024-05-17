import { Global, Module } from "@nestjs/common";
import { CONFIG_SCHEMA } from "./config.constant";
import { ConfigSchemaZ } from "./config.schema";
import { ConfigService } from "./config.service";

@Global()
@Module({
    providers: [
        ConfigService,
        {
            provide: CONFIG_SCHEMA,
            useValue: ConfigSchemaZ,
        },
    ],
    exports: [ConfigService],
})
export class ConfigModule {}
