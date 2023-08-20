import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ApiConfigService } from 'config/api-config.service';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
/* import { Pool } from 'pg'; */

/* import { db } from 'shared/db'; */
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });

    app.use(helmet());
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
        }),
    );
    app.use(
        morgan(
            ':remote-addr - :remote-user [:date[clf]] :response-time ms ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
        ),
    );

    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    app.enableShutdownHooks();
    /* console.log(process.env.PG_URL, 'main.ts') */
    /* const pool = new Pool({ */
    /*     connectionString: process.env.PG_URL, */
    /* }); */
    /**/
    /* const db = drizzle(pool, { logger: true }); */
    /**/
    /* await migrate(db, { migrationsFolder: 'drizzle' }); */

    const config = app.get(ApiConfigService);
    const PORT = config.server.port;

    await app.listen(PORT, () => console.log('Server running on port:', PORT));
}

void bootstrap();
