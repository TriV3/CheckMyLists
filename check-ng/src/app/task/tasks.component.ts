import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TasksService } from './tasks.service';

@Component({
    selector: 'app-task',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
    providers: [TasksService]
})
export class TasksComponent implements OnInit {


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

    TaskDialog(todo = null) {
        this.okButtonText = 'Create task';
        this.modalTitle = 'New task';
        this.fieldValue = '';
        this.editingTask = todo;
        if (todo) {
            this.fieldValue = todo.title;
            this.okButtonText = 'Edit task';
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

    AddTask(title) {
        if (!title || title === '') {
            this.HideDialog();
            return;
        }
        title = title.trim();
        this.tasksService.add({ title: title, isDone: false }).then(() => {
            return this.GetTasks();
        }).then(() => {
            this.HideDialog();
        });
    }

    UpdateTask(task, newValue) {
        task.title = newValue;
        return this.tasksService.put(task).then(() => {
            task.editing = false;
            return this.GetTasks();
        });
    }

    // UpdateTask(title) {
    //     if (title) {
    //         title = title.trim();
    //         if (this.editingTask) {
    //             this.EditTask(title);
    //         } else {
    //             this.AddTask(title);
    //         }
    //     }
    //     this.HideDialog();
    // }

    DestroyTask(task) {
        this.tasksService.delete(task._id).then(() => {
            return this.GetTasks();
        });
    }

    ClearCompleted() {

        this.tasksService.deleteCompleted().then(() => {
            return this.GetTasks();
        });
    }

    CheckTask(task) {
        this.tasksService.InverseDoneTodo(task).then(() => {
            return this.GetTasks();
        });
    }

    SetTaskState() {
        this.areAllSelected = !this.areAllSelected;
        console.log(this.areAllSelected);

        this.tasksService.setTodosState(this.areAllSelected).then(() => {
            return this.GetTasks();
        });

    }

    Filter(type: string) {
        this.filterType = type;
    }

}
