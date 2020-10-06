import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/providers/auth.service';
import { ConfigService } from '@nestjs/config';
import { Config } from './global/config/Configuration';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const authService = app.get(AuthService);
    app.setGlobalPrefix('api');
    await authService.CreateFirstAdminUser();
    await app.listen(configService.get(Config.PORT));
}
bootstrap();
