import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tasksFilter',
    pure: false // add in this line, update value when we change filter
})
export class TasksFilterPipe implements PipeTransform {

    transform(items: any[], filterType: string): any[] {
        if (!items) { return []; }
        if (!filterType) { return items; }

        filterType = filterType.toLowerCase();
        // if (filterType === 'all') { return items; }

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
