import { Module } from '@nestjs/common';
import { ApiConfigModule } from 'config/api-config.module';
import { UserModule } from 'modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [ApiConfigModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
