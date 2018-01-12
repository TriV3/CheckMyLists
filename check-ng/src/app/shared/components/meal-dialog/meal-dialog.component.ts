import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Meal } from '../../models/meal';

@Component({
    selector: 'app-meal-dialog',
    templateUrl: './meal-dialog.component.html',
    styleUrls: ['./meal-dialog.component.scss']
})
export class MealDialogComponent implements OnInit, OnChanges {

    public DayList = ['monday', 'tuesday', 'wednesday', 'thirsday', 'friday', 'saturday', 'sunday'];
    public TimeList = ['lunch', 'dinner'];

    @Input() showPrompt: boolean;
    @Input() title: string;
    @Input() okText: string;
    @Input() cancelText: string;


    @Input() meal: Meal;
    @Output() valueEmitted = new EventEmitter<Meal>();


    public selectedDay: string;
    public selectedTime: string;

    private _meal: Meal;
    constructor() {
        this._meal = new Meal();
    }


    ngOnInit() {
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

        if (changes['meal'] && this.meal) {
            this.selectedDay = this.DayList[this.meal.dayNumber];
            this.selectedTime = this.TimeList[this.meal.dayTime];
        }
        if (changes['meal'] && !this.meal) {

            this.selectedDay = this.DayList[0];
            this.selectedTime = this.TimeList[0];

        }
    }

    emitValue(b: boolean) {
        if (b) {
            if (this.meal) {
                this.meal.dayNumber = this.DayList.indexOf(this.selectedDay);
                this.meal.dayTime = this.TimeList.indexOf(this.selectedTime);
                this.valueEmitted.emit(this.meal);
            } else {
                this._meal.dayNumber = this.DayList.indexOf(this.selectedDay);
                this._meal.dayTime = this.TimeList.indexOf(this.selectedTime);
                this.valueEmitted.emit(this._meal);
                this._meal = new Meal();
            }
        } else {
            this.valueEmitted.emit(null);
        }
    }

}
