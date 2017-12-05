import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    public tasks;
    public activeTasks;
    private path;
    public areAllSelected = false;

    public filterType = 'All';

    private editingTask: any = null;

    showDialog = false;
    fieldValue = '';
    okButtonText = 'Create task';
    modalTitle = 'New task';


    constructor(private tasksService: TasksService, private route: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.GetTasks();
    }

    TaskDialog(task: Task = null) {
        this.okButtonText = 'Create task';
        this.modalTitle = 'New';
        this.fieldValue = '';
        this.editingTask = task;
        if (task) {
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

    GetTasks(query = '') {
        return this.tasksService.get(query).then(tasks => {
            this.tasks = tasks;
            this.activeTasks = this.tasks.filter(task => !task.isDone).length;
            this.changeDetectorRef.markForCheck();
        });
    }

    AddTask(task: Task) {
        if (!task.title || task.title === '') {
            this.HideDialog();
            return;
        }
        task.title = task.title.trim();
        this.tasksService.add(new Task(task.title)).then(() => {
            return this.GetTasks();
        }).then(() => {
            this.HideDialog();
        });
    }

    UpdateTask(task: Task) {
        return this.tasksService.replace(task).then(() => {
            // this.editingTask = false;
            this.HideDialog();
            return this.GetTasks();
        });
    }

    CommitTask(task: Task) {
        if (task && task.title !== '') {
            task.title = task.title.trim();
            if (this.editingTask) {
                this.UpdateTask(task);
            } else {
                this.AddTask(task);
            }
        }
        this.HideDialog();
    }

    DestroyTask(task: Task) {
        this.tasksService.delete(task).then(() => {
            return this.GetTasks();
        });
    }

    ClearCompleted() {

        this.tasksService.deleteCompleted().then(() => {
            return this.GetTasks();
        });
    }

    CheckTask(task: Task) {
        this.tasksService.InverseDoneTask(task).then(() => {
            return this.GetTasks();
        });
    }

    SetTaskState(tasks: Task[]) {
        this.areAllSelected = !this.areAllSelected;

        this.tasksService.setTodosState(this.areAllSelected).then(() => {
            return this.GetTasks();
        });

    }

    Filter(type: string) {
        this.filterType = type;
    }

    sort(tasks: Task[]) {
        tasks.forEach((task, i) => {
            task.order_id = i;
        });
        return this.tasksService.replaceAll(tasks).then(() => {
            return this.GetTasks();
        });
    }

}
