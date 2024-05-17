import { Inject, Injectable } from "@nestjs/common";
import dotenv from "dotenv";
import { CONFIG_SCHEMA } from "./config.constant";
import { Config, ConfigSchemaZ } from "./config.schema";

dotenv.config();

@Injectable()
export class ConfigService {
    private readonly config: Config;
    constructor(@Inject(CONFIG_SCHEMA) schema: typeof ConfigSchemaZ) {
        const result = schema.safeParse(process.env);
        if (!result.success) {
            throw new Error(
                result.error.issues
                    .map((i) => `${i.message}: ${i.path.map((path) => path).join(".")}`)
                    .join("\n"),
            );
        }
        this.config = result.data;
    }

    get<T extends keyof Config>(key: T): Config[T] {
        return this.config[key];
    }

    get nodeEnv(): Config["NODE_ENV"] {
        return this.get("NODE_ENV");
    }

    get isDevelopment(): boolean {
        return this.nodeEnv === "development";
    }

    get isProduction(): boolean {
        return this.nodeEnv === "production";
    }

    get isTest(): boolean {
        return this.nodeEnv === "test";
    }
}
