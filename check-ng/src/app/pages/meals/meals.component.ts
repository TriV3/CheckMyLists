import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { MealsService } from '../../shared/services/meals/meals.service';
import { Meal } from '../../shared/models/meal';

@Component({
    selector: 'app-meals',
    templateUrl: './meals.component.html',
    styleUrls: ['./meals.component.scss'],
    providers: [MealsService]
})
export class MealsComponent implements OnInit {
    public title = 'Meals';
    public meals: Meal[];
    public activeMeals: number;
    private path;
    public areAllSelected = false;

    public filterType = 'All';

    private editingMeal: any = null;

    showDialog = false;
    fieldValue = '';
    okButtonText = 'Create meal';
    modalTitle = 'New meal';

    constructor(private mealsService: MealsService, private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.GetMeals();
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
        this.okButtonText = 'Create';
        this.modalTitle = 'New meal';
        this.fieldValue = '';
        this.editingMeal = value;
        if (value) {
            this.okButtonText = 'Edit';
            this.modalTitle = 'Edit meal';
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

}
