import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Meal } from '../../models/meal';
import { Purchase } from '../../models/purchase';
import { Task } from '../../models/task';

@Component({
    selector: 'app-list-container',
    templateUrl: './list-container.component.html',
    styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnInit {

    @Input() values: Array<any>;
    @Input() type: string;
    @Input() activeElements: number;
    @Output() onCheck = new EventEmitter<any>();
    @Output() onEdit = new EventEmitter<any>();
    @Output() onDestroy = new EventEmitter<any>();
    @Output() onSetAllState = new EventEmitter<any>();
    @Output() onDialog = new EventEmitter<any>();
    @Output() onSort = new EventEmitter<any>();
    @Output() onClearCompleted = new EventEmitter<any>();

    public areAllSelected = false;

    public filterType = 'All';

    private editingElement: any = null;

    public isMeal = false;
    public isPurchase = false;
    public isTask = false;

    constructor() { }

    ngOnInit() {
    }

    Filter(type: string) {
        this.filterType = type;
    }

    SetAllState() {
        this.areAllSelected = !this.areAllSelected;
        this.onSetAllState.emit(this.areAllSelected);
    }

}
