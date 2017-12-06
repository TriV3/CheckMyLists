import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../shared/models/task';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

    @Input() task: Task;
    @Output() check = new EventEmitter<Task>();
    @Output() edit = new EventEmitter<Task>();
    @Output() destroy = new EventEmitter<Task>();

    private _task: Task;
    constructor() { }

    ngOnInit() {
        this._task = this.task;
    }

    Check() {
        this.check.emit(this.task);
    }
    Edit() {
        this.edit.emit(this.task);
    }
    Destroy() {
        this.destroy.emit(this.task);
    }

}
