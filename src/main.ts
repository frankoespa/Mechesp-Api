import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { ConfigService } from '@nestjs/config';
import { Config } from './global/config/Configuration';
import { UserService } from './user/providers/UserService';
import { InitialDataService } from './db/providers/InitialDataService';
import { HttpExceptionFilter } from './global/base/exceptions/HttpExceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from './global/base/exceptions/ExceptionValidation';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    
    app.enableCors({origin: '*'})

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			exceptionFactory: (validations) => {
                return new ValidationException(validations[0].constraints[Object.keys(validations[0].constraints)[0]]);
			}
		})
	);
	app.useGlobalFilters(new HttpExceptionFilter());

	const configService = app.get(ConfigService);
	const usersService = app.get(UserService);
	const initialData = app.get(InitialDataService);

	await initialData.Initialize();
	await usersService.CreateFirstAdminUser();

	await app.listen(configService.get(Config.PORT));
}
bootstrap();
