import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberToArray'
})
export class NumberToArrayPipe implements PipeTransform {
    transform(value: number) {
        value = Math.ceil(value);
        return (new Array(value)).fill(1);
    }
}
