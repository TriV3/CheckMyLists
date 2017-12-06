import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Purchase } from '../../../shared/models/purchase';

@Component({
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

    @Input() purchase: Purchase;
    @Output() onCheck = new EventEmitter<Purchase>();
    @Output() onEdit = new EventEmitter<Purchase>();
    @Output() onDestroy = new EventEmitter<Purchase>();

    constructor() { }

    ngOnInit() {
    }
}
