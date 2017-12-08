import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../shared/models/task';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

    @Input() task: Task;
    @Output() onCheck = new EventEmitter<Task>();
    @Output() onEdit = new EventEmitter<Task>();
    @Output() onDestroy = new EventEmitter<Task>();

    private _task: Task;
    constructor() { }

    ngOnInit() {
        this._task = this.task;
    }


}
