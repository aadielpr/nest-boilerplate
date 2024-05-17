import { z } from "zod";

const minuteInSeconds = 60;
const hourInSeconds = minuteInSeconds * 60;

export const ConfigSchemaZ = z.object({
    /** Common Env */
    PORT: z.coerce.number().default(8888),
    NODE_ENV: z
        .union([
            z.literal("development"),
            z.literal("staging"),
            z.literal("test"),
            z.literal("production"),
        ])
        .default("development"),
    QUERY_LOGGER: z
        .union([z.boolean(), z.literal("true"), z.literal("false")])
        .transform((value) => value === true || value === "true")
        .default(false),
    /** Auth Env */
    API_KEY: z.string(),
    JWT_SECRET: z.string(),
    JWT_EXPIRE: z.coerce.number().default(hourInSeconds * 12),
    JWT_ISSUER: z.string(),
    JWT_ALGORITHM: z.literal("HS256").default("HS256"),
    /** Postgres Env */
    POSTGRES_URI: z.string(),
});

export type Config = z.infer<typeof ConfigSchemaZ>;
