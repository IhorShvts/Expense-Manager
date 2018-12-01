import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'truncate'
})

export class TruncatePipe implements PipeTransform {
    transform(value: string, limit = 14, completeWords = false, ellipsis = '...') {
        if (completeWords === true && value.length > limit) {
            return value.substring(0, limit).concat(ellipsis);
        }
        return value;
    }
}
