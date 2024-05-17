import { VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "config";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
    });

    app.use(helmet());

    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
        }),
    );

    app.set("trust proxy", 1);

    app.setGlobalPrefix("api");

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: "1",
    });

    app.enableShutdownHooks();

    const config = app.get(ConfigService);
    const PORT = config.get("PORT");

    await app.listen(PORT, () => console.log("Server running on port:", PORT));
}

void bootstrap();
