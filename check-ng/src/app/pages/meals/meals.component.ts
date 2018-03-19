import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { TranslateService } from '../../translate';

import { MealsService } from '../../shared/services/meals/meals.service';
import { Meal } from '../../shared/models/meal';

@Component({
    selector: 'app-meals',
    templateUrl: './meals.component.html',
    styleUrls: ['./meals.component.scss'],
    providers: [MealsService]
})
export class MealsComponent implements OnInit, OnDestroy {
    public title = 'Meals';
    public meals: Meal[];
    public activeMeals: number;
    private path;
    public areAllSelected = false;

    public filterType = 'All';

    public editingMeal: any = null;

    showDialog = false;
    fieldValue = '';
    okButtonText = 'Create meal';
    modalTitle = 'New meal';

    private translateSubscription: any;

    constructor(private mealsService: MealsService,
        private changeDetectorRef: ChangeDetectorRef,
        private _translate: TranslateService) { }

    ngOnInit() {
        this.GetMeals();
        this.title = this._translate.instant('meals', null);

        this.translateSubscription = this.subscribeToLangChanged();

    }

    ngOnDestroy() {
        this.translateSubscription.unsubscribe();
    }

    GetMeals(query = '') {
        return this.mealsService.get(query).then(meals => {
            this.meals = meals as Array<Meal>;
            this.activeMeals = this.meals.filter(purchase => !purchase.isDone).length;
            this.changeDetectorRef.markForCheck();
        });
    }

    Check(value: Meal) {
        this.mealsService.ToggleComplete(value).then(() => {
            return this.GetMeals();
        });
    }

    Destroy(value: Meal) {
        this.mealsService.delete(value).then(() => {
            return this.GetMeals();
        });
    }

    SetAllState(state: boolean) {
        this.mealsService.setAllState(state).then(() => {
            return this.GetMeals();
        });
    }

    Sort(values: Meal[]) {
        values.forEach((value, i) => {
            value.order_id = i;
        });
        return this.mealsService.replaceAll(values).then(() => {
            return this.GetMeals();
        });

    }

    ClearCompleted() {
        this.mealsService.deleteCompleted().then(() => {
            return this.GetMeals();
        });
    }

    Dialog(value: Meal) {
        this.okButtonText = this._translate.instant('create', null);
        this.modalTitle = this._translate.instant('create-meal', null);
        this.fieldValue = '';
        this.editingMeal = value;
        if (value) {
            this.okButtonText = this._translate.instant('edit', null);
            this.modalTitle = this._translate.instant('edit-meal', null);
        }
        this.showDialog = true;
    }

    HideDialog() {
        this.showDialog = false;
        this.editingMeal = null;
        this.fieldValue = null;
    }

    CommitDialog(value: Meal) {
        if (value && value.title !== '') {
            value.title = value.title.trim();
            if (this.editingMeal) {
                return this.mealsService.replace(value).then(() => {
                    this.HideDialog();
                    return this.GetMeals();
                });
            } else {
                if (!value.title || value.title === '') {
                    this.HideDialog();
                    return;
                }
                this.mealsService.add(value).then(() => {
                    return this.GetMeals();
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
        this.title = this._translate.instant('meals', null);

    }

}
