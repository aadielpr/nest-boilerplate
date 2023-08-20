import type { Config } from 'drizzle-kit';

export default {
    schema: './src/**/*.schema.ts',
    out: './drizzle',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.PG_URL! || "postgresql://adielpratama@localhost/arky",
    },
} satisfies Config;
