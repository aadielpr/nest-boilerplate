import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiConfigModule } from 'config/api-config.module';
import { UserModule } from 'modules/user/user.module';

@Module({
    imports: [ApiConfigModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
