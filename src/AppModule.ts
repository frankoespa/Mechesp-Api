import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configuration, Config } from './global/config/Configuration';
import { AuthModule } from './auth/AuthModule';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/UserModule';
import { VehicleModule } from './vehicle/VehicleModule';
import { SharedModule } from './shared/SharedModule';
import { RoleModule } from './role/RoleModule';
import * as Autopopulate from 'mongoose-autopopulate'
import { DbModule } from './db/DbModule';
import { NotificationModule } from './notifications/NotificationModule';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [Configuration.Get()]
		}),
		MongooseModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				connectionFactory: (connection: { plugin: any }): any => {
					connection.plugin(Autopopulate);
					return connection;
				},
				uri: configService.get<string>(Config.MONGODB_URI)
			}),
			inject: [ConfigService]
		}),
		AuthModule,
		DbModule,
		UserModule,
		VehicleModule,
		SharedModule,
		RoleModule,
		NotificationModule
	]
})
export class AppModule {}
