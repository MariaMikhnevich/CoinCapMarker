import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customNumber',
})
export class CustomNumberPipe implements PipeTransform {
    transform(value: number): string {
        if (value == null) return '';
        const srt = `${value}`;
        const parts = srt.split('.');
        if (+parts[0] === 0) {
            let index = 0;
            for (let i = 0; i < parts[1].length; i += 1) {
                if (+parts[1][i] !== 0) {
                    index = i;
                    break;
                }
            }
            parts[1] = parts[1].slice(0, index + 4);
            return parts.join('.');
        }
        parts[1] = parts[1].slice(0, 2);
        return parts.join('.');
    }
}
