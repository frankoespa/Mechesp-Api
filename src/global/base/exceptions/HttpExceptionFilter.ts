import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionResponse } from './ExceptionResponse';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

	catch(exception: HttpException, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response<ExceptionResponse>>();
		const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        
		response.status(status).json({
			status: status,
			timestamp: new Date().toISOString(),
			url: request.url,
			message: exception.message
		});
	}
}
