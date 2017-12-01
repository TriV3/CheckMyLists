import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';


@Component({
    selector: 'app-task-dialog',
    templateUrl: './task-dialog.component.html',
    styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

    @Input() showPrompt: boolean;
    @Input() title: string;
    @Input() placeholder: string;
    @Input() okText: string;
    @Input() cancelText: string;


    @Input() task: Task;
    @Output() valueEmitted = new EventEmitter<Task>();

    private _task: Task;

    constructor() {
        this.okText = 'OK';
        this.cancelText = 'Cancel';
        this.title = 'Create Task';
        this.task = new Task('');
        this._task = new Task('');
    }

    ngOnInit() {
    }

    emitValue(b: boolean) {
        if (b) {
            if (this.task) {
                this.valueEmitted.emit(this.task);
            } else {
                this.valueEmitted.emit(this._task);
                this._task = new Task('');
            }
        } else {
            this.valueEmitted.emit(null);
        }
    }

}
