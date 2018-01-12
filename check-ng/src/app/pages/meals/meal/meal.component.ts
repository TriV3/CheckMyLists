import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Meal } from '../../../shared/models/meal';

@Component({
    selector: 'app-meal',
    templateUrl: './meal.component.html',
    styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

    public DayList = ['monday', 'tuesday', 'wednesday', 'thirsday', 'friday', 'saturday', 'sunday'];
    public TimeList = ['lunch', 'dinner'];

    @Input() meal: Meal;
    @Output() onCheck = new EventEmitter<Meal>();
    @Output() onEdit = new EventEmitter<Meal>();
    @Output() onDestroy = new EventEmitter<Meal>();



    constructor() {
    }

    ngOnInit() {
    }

}
