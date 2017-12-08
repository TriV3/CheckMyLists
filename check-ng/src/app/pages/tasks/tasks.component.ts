import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { TasksService } from '../../shared/services/tasks/tasks.service';
import { Task } from '../../shared/models/task';


@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
    providers: [TasksService],
})
export class TasksComponent implements OnInit {

    public title = 'Tasks';
    public tasks: Task[];
    public activeTasks: number;
    private path;
    public areAllSelected = false;

    public filterType = 'All';

    private editingTask: any = null;

    showDialog = false;
    fieldValue = '';
    okButtonText = 'Create task';
    modalTitle = 'New task';


    constructor(private tasksService: TasksService, private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.GetTasks();
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
        this.okButtonText = 'Create';
        this.modalTitle = 'New task';
        this.fieldValue = '';
        this.editingTask = value;
        if (value) {
            this.okButtonText = 'Edit';
            this.modalTitle = 'Edit task';
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


}
