import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'completeFilter',
    pure: false
})
export class CompleteFilterPipe implements PipeTransform {

    transform(items: any[], filterType: string): any[] {
        if (!items) { return []; }
        if (!filterType) { return items; }

        filterType = filterType.toLowerCase();

        if (filterType === 'completed') {
            return items.filter(it => {
                return it.isDone === true;
            });
        } else if (filterType === 'active') {
            return items.filter(it => {
                return it.isDone === false;
            });
        } else {
            return items;
        }
    }
}
