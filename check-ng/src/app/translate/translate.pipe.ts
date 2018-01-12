import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service'; // our translate service

@Pipe({
    name: 'translate',
    pure: false
})

export class TranslatePipe implements PipeTransform {

    constructor(private _translate: TranslateService) { }

    public transform(value: string, args?: string | string[]): any { // args can be string or string array
        if (!value) {
            return;
        }
        return this._translate.instant(value, args); // pass in args
    }
}
