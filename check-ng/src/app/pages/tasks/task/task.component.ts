import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../shared/models/task';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

    @Input() task: Task;
    @Output() checkTask = new EventEmitter<Task>();
    @Output() editTask = new EventEmitter<Task>();
    @Output() destroyTask = new EventEmitter<Task>();

    private _task: Task;
    constructor() { }

    ngOnInit() {
        this._task = this.task;
    }

    CheckTask() {
        this.checkTask.emit(this.task);
    }
    EditTask() {
        console.log('Edit Task');

        this.editTask.emit(this.task);
    }
    DestroyTask() {
        this.destroyTask.emit(this.task);
    }

}
