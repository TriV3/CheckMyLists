import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { PurchasesService } from '../../shared/services/purchases/purchases.service';
import { Purchase } from '../../shared/models/purchase';

import { TranslateService } from '../../translate';
@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.scss'],
    providers: [PurchasesService]
})
export class PurchasesComponent implements OnInit, OnDestroy {

    public title = 'Purchases';
    public purchases: Purchase[];
    public activePurchases: number;
    private path;
    public areAllSelected = false;

    public filterType = 'All';

    public editingPurchase: any = null;

    showDialog = false;
    fieldValue = '';
    okButtonText = 'Create purchase';
    modalTitle = 'New purchase';

    private translateSubscription: any;

    constructor(private purchasesService: PurchasesService,
        private changeDetectorRef: ChangeDetectorRef,
        private _translate: TranslateService) { }

    ngOnInit() {
        this.GetPurchases();
        this.title = this._translate.instant('purchases', null);

        this.translateSubscription = this.subscribeToLangChanged();
    }

    ngOnDestroy() {
        this.translateSubscription.unsubscribe();
    }

    GetPurchases(query = '') {
        return this.purchasesService.get(query).then(purchases => {
            this.purchases = purchases as Array<Purchase>;
            this.activePurchases = this.purchases.filter(purchase => !purchase.isDone).length;
            this.changeDetectorRef.markForCheck();
        });
    }


    Check(value: Purchase) {
        this.purchasesService.ToggleComplete(value).then(() => {
            return this.GetPurchases();
        });
    }

    Destroy(value: Purchase) {
        this.purchasesService.delete(value).then(() => {
            return this.GetPurchases();
        });
    }

    SetAllState(state: boolean) {
        this.purchasesService.setAllState(state).then(() => {
            return this.GetPurchases();
        });
    }

    Sort(values: Purchase[]) {
        values.forEach((value, i) => {
            value.order_id = i;
        });
        return this.purchasesService.replaceAll(values).then(() => {
            return this.GetPurchases();
        });

    }

    ClearCompleted() {
        this.purchasesService.deleteCompleted().then(() => {
            return this.GetPurchases();
        });
    }

    Dialog(value: Purchase) {
        this.okButtonText = this._translate.instant('create', null);
        this.modalTitle = this._translate.instant('create-purchase', null);
        this.fieldValue = '';
        this.editingPurchase = value;
        if (value) {
            this.okButtonText = this._translate.instant('edit', null);
            this.modalTitle = this._translate.instant('edit-purchase', null);
        }
        this.showDialog = true;
    }

    HideDialog() {
        this.showDialog = false;
        this.editingPurchase = null;
        this.fieldValue = null;
    }

    CommitDialog(purchase: Purchase) {
        if (purchase && purchase.title !== '') {
            purchase.title = purchase.title.trim();
            if (this.editingPurchase) {
                return this.purchasesService.replace(purchase).then(() => {
                    this.HideDialog();
                    return this.GetPurchases();
                });
            } else {
                if (!purchase.title || purchase.title === '') {
                    this.HideDialog();
                    return;
                }
                purchase.title = purchase.title.trim();
                this.purchasesService.add(new Purchase(purchase.title, purchase.price)).then(() => {
                    return this.GetPurchases();
                }).then(() => {
                    this.HideDialog();
                });
            }
        }
        this.HideDialog();
    }


    subscribeToLangChanged() {
        // refresh text
        // please unsubribe during destroy
        return this._translate.onLangChanged.subscribe(x => this.refreshText());
    }

    refreshText() {
        // refresh translation when language change
        this.title = this._translate.instant('purchases', null);

    }

}
