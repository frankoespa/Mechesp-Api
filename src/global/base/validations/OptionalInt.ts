import { registerDecorator, ValidationOptions, isInt } from 'class-validator';

export function OptionalInt(validationOptions?: ValidationOptions) {
	return function(object: Record<string, any>, propertyName: string): void {
		registerDecorator({
			name: 'OptionalInt',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [propertyName],
			options: {
				always: validationOptions?.always,
				context: validationOptions?.context,
				each: validationOptions?.each,
				groups: validationOptions?.groups,
				message: validationOptions?.message ?? 'El campo $property es opcional y debe ser de tipo número'
			},
			validator: {
				validate(value: any) {
					return isInt(value) || value === null;
				}
			}
		});
	};
}
