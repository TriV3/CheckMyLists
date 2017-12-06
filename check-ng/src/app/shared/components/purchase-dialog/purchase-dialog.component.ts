import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Purchase } from '../../models/purchase';


@Component({
    selector: 'app-purchase-dialog',
    templateUrl: './purchase-dialog.component.html',
    styleUrls: ['./purchase-dialog.component.scss']
})
export class PurchaseDialogComponent implements OnInit {

    @Input() showPrompt: boolean;
    @Input() title: string;
    @Input() okText: string;
    @Input() cancelText: string;


    @Input() purchase: Purchase;
    @Output() valueEmitted = new EventEmitter<Purchase>();

    private _purchase: Purchase;

    constructor() {
        this.okText = 'OK';
        this.cancelText = 'Cancel';
        this.title = 'Create Purchase';
        this.purchase = new Purchase('', '');
        this._purchase = new Purchase('', '');
    }

    ngOnInit() {
    }

    emitValue(b: boolean) {
        if (b) {
            if (this.purchase) {
                this.valueEmitted.emit(this.purchase);
            } else {
                this.valueEmitted.emit(this._purchase);
                this._purchase = new Purchase('', '');
            }
        } else {
            this.valueEmitted.emit(null);
        }
    }

}
