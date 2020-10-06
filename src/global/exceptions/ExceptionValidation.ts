import { HttpException, HttpStatus } from '@nestjs/common';

export class MultiValidationException {
	private validations: string[] = [];

	AddMessageValidation(message: string): void {
		this.validations.push(message);
	}

	Throw(): void {
		if (!(this.validations.length))
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					errors: this.validations
				},
				HttpStatus.BAD_REQUEST
			);
	}
}

export class ValidationException extends HttpException {
    constructor(message: string) {
                super(
					{
						status: HttpStatus.BAD_REQUEST,
						errors: [message]
					},
					HttpStatus.BAD_REQUEST
				);
            }
		}
