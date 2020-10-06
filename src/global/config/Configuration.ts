import { ConfigFactory } from '@nestjs/config/dist/interfaces';

interface IConfiguration {
    PORT: number;
    FIREBASE: {
        CREDENTIALS: string
    },
    DATABASE: {
        MONGODB_URI: string;
    };
}

export enum Config {
    PORT = 'PORT',
	MONGODB_URI = 'DATABASE.MONGODB_URI'
}

export class Configuration {
    static Get(): ConfigFactory<IConfiguration> {
        return (): IConfiguration => ({
			PORT: parseInt(process.env.PORT, 10) || 4000,
            FIREBASE: {
                CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
			},
			DATABASE: {
				MONGODB_URI: process.env.MONGODB_URI
			}
		});
    }
}