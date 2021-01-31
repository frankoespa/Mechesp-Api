import { ConfigFactory } from '@nestjs/config/dist/interfaces';

interface IConfiguration {
    PORT: number;
    FIREBASE: {
        CREDENTIALS: string
    },
    DATABASE: {
        MONGODB_URI: string;
    };
    MAILJET: {
        KEY: string,
        SECRET_KEY: string
    }
}

export enum Config {
	PORT = 'PORT',
	MONGODB_URI = 'DATABASE.MONGODB_URI',
	MAILJET_KEY = 'MAILJET.KEY',
	MAILJET_SECRET_KEY = 'MAILJET.SECRET_KEY'
}

export abstract class Configuration {
    static Get(): ConfigFactory<IConfiguration> {
        return (): IConfiguration => ({
			PORT: parseInt(process.env.PORT, 10) || 4000,
			FIREBASE: {
				CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS
			},
			DATABASE: {
				MONGODB_URI: process.env.MONGODB_URI
			},
			MAILJET: {
				KEY: process.env.MAILJET_KEY,
				SECRET_KEY: process.env.MAILJET_SECRET_KEY
			}
		});
    }
}