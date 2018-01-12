import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { TranslateService } from '../../translate';

import { TasksService } from '../../shared/services/tasks/tasks.service';
import { Task } from '../../shared/models/task';


@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
    providers: [TasksService],
})
export class TasksComponent implements OnInit, OnDestroy {

    public title = 'Tasks';
    public tasks: Task[];
    public activeTasks: number;
    private path;
    public areAllSelected = false;

    public filterType = 'All';

    public editingTask: any = null;

    showDialog = false;
    fieldValue = '';
    okButtonText = 'Create task';
    modalTitle = 'New task';

    private translateSubscription: any;

    constructor(private tasksService: TasksService,
        private changeDetectorRef: ChangeDetectorRef,
        private _translate: TranslateService) { }

    ngOnInit() {
        this.GetTasks();
        this.title = this._translate.instant('tasks', null);

        this.translateSubscription = this.subscribeToLangChanged();
    }

    ngOnDestroy() {
        this.translateSubscription.unsubscribe();
    }

    GetTasks(query = '') {
        return this.tasksService.get(query).then(tasks => {
            this.tasks = tasks as Array<Task>;
            this.activeTasks = this.tasks.filter(task => !task.isDone).length;
            this.changeDetectorRef.markForCheck();
        });
    }

    Check(task: Task) {
        this.tasksService.ToggleComplete(task).then(() => {
            return this.GetTasks();
        });
    }

    Destroy(task: Task) {
        this.tasksService.delete(task).then(() => {
            return this.GetTasks();
        });
    }

    SetAllState(state: boolean) {
        this.tasksService.setAllState(state).then(() => {
            return this.GetTasks();
        });
    }

    Sort(values: Task[]) {
        values.forEach((value, i) => {
            value.order_id = i;
        });
        return this.tasksService.replaceAll(values).then(() => {
            return this.GetTasks();
        });

    }

    ClearCompleted() {
        this.tasksService.deleteCompleted().then(() => {
            return this.GetTasks();
        });
    }

    Dialog(value: Task = null) {
        this.okButtonText = this._translate.instant('create', null);
        this.modalTitle = this._translate.instant('create-task', null);
        this.fieldValue = '';
        this.editingTask = value;
        if (value) {
            this.okButtonText = this._translate.instant('edit', null);
            this.modalTitle = this._translate.instant('edit-task', null);
        }
        this.showDialog = true;
    }

    HideDialog() {
        this.showDialog = false;
        this.editingTask = null;
        this.fieldValue = null; // make sure Input is new
    }

    CommitDialog(value: Task) {
        if (value && value.title !== '') {
            value.title = value.title.trim();
            if (this.editingTask) {
                return this.tasksService.replace(value).then(() => {
                    this.HideDialog();
                    return this.GetTasks();
                });
            } else {
                if (!value.title || value.title === '') {
                    this.HideDialog();
                    return;
                }
                this.tasksService.add(value).then(() => {
                    return this.GetTasks();
                }).then(() => {
                    this.HideDialog();
                });
            }
        }
        this.HideDialog();
    }

    subscribeToLangChanged() {
        // refresh text
        // please unsubribe during destroy
        return this._translate.onLangChanged.subscribe(x => this.refreshText());
    }

    refreshText() {
        // refresh translation when language change
        this.title = this._translate.instant('meals', null);

    }

}
