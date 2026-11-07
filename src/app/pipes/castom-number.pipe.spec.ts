import { beforeEach, describe, expect, it } from 'vitest';
import { CustomNumberPipe } from './castom-number.pipe';

describe('CustomNumberPipe', () => {
    let pipe: CustomNumberPipe;

    beforeEach(() => {
        pipe = new CustomNumberPipe();
    });

    it('keeps two decimals for regular numbers', () => {
        expect(pipe.transform(123.456)).toBe('123.45');
    });

    it('keeps five significant digits for small fractions', () => {
        expect(pipe.transform(0.0000123456789)).toBe('0.00001234');
    });

    it('keeps short fractions as is', () => {
        expect(pipe.transform(0.5)).toBe('0.5');
    });

    it('returns integers without decimals', () => {
        expect(pipe.transform(123)).toBe('123');
        expect(pipe.transform(0)).toBe('0');
    });

    it('returns an empty string for nullish values', () => {
        expect(pipe.transform(null as unknown as number)).toBe('');
    });
});
