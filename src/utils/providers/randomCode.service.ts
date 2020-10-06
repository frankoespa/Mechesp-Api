import { Injectable } from '@nestjs/common';
import { customAlphabet } from 'nanoid';

@Injectable()
export class RandomCodeService {
    private readonly alphabet: string;
    private readonly totalCharacters: number;

	constructor() {
        this.alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        this.totalCharacters = 10
	}

	Generate(): string {
		return customAlphabet(this.alphabet, this.totalCharacters)();
	}
}
