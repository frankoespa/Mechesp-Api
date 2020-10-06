import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configuration, Config } from './global/config/Configuration';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { VehicleModule } from './vehicles/vehicle.module';
import { UtilsModule } from './utils/utils.module';
import * as Autopopulate from 'mongoose-autopopulate'

@Module({
	imports: [
        ConfigModule.forRoot({
            isGlobal: true,
			load: [Configuration.Get()]
		}),
		MongooseModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				connectionFactory: (connection: {plugin: any}): any => {
					connection.plugin(Autopopulate);
					return connection;
				},
				uri: configService.get<string>(Config.MONGODB_URI)
			}),
			inject: [ConfigService]
		}),
		AuthModule,
		UsersModule,
		VehicleModule,
		UtilsModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
