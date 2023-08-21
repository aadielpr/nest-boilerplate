/**
 * Credit:
 *  - github.com/NarHakobyan/awesome-nest-boilerplate
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PoolConfig } from 'pg';

@Injectable()
export class ApiConfigService {
    constructor(private configService: ConfigService) {}

    private get(key: string): string {
        const value = this.configService.get<string>(key);

        if (!value) {
            throw new Error('Environment variable does not set -> ' + key);
        }

        return value;
    }

    private getNumber(key: string): number {
        const value = this.get(key);

        try {
            return Number(value);
        } catch {
            throw new Error('Environment variable is not a number -> ' + key);
        }
    }

    private getBoolean(key: string): boolean {
        const value = this.get(key);

        try {
            return Boolean(JSON.parse(value));
        } catch {
            throw new Error('Environment variable is not a boolean -> ' + key);
        }
    }

    private getString(key: string): string {
        const value = this.get(key);

        return value.replace(/\\n/g, '\n');
    }

    get nodeEnv(): string {
        return this.getString('NODE_ENV');
    }

    get isDevelopment(): boolean {
        return this.nodeEnv === 'development';
    }

    get isProduction(): boolean {
        return this.nodeEnv === 'production';
    }

    get isTest(): boolean {
        return this.nodeEnv === 'test';
    }

    get server() {
        return {
            port: this.getNumber('PORT'),
        };
    }

    get pgConfig(): PoolConfig {
        return {
            connectionString: this.getString('PG_URL'),
        };
    }
}
