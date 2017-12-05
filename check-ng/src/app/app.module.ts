import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatMenuModule, MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule,
    MatCheckboxModule, MatRadioModule, MatMenu
} from '@angular/material';

import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskComponent } from './pages/tasks/task/task.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';
import { PurchaseComponent } from './pages/purchases/purchase/purchase.component';
import { MealsComponent } from './pages/meals/meals.component';
import { MealComponent } from './pages/meals/meal/meal.component';

import { TaskDialogComponent } from './shared/components/task-dialog/task-dialog.component';

import { ApiRequestsService } from './shared/services/api-requests.service';

import { TasksFilterPipe } from './shared/filters/tasks-filter.pipe';
import { ArraySortPipe } from './shared/filters/arraySort.pipe';


const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: 'meals', component: MealsComponent },
    { path: 'purchases', component: PurchasesComponent },
    { path: 'tasks', component: TasksComponent },
    { path: '**', redirectTo: 'tasks', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        TasksComponent,
        TaskDialogComponent,
        TasksFilterPipe,
        ArraySortPipe,
        TaskComponent,
        PurchasesComponent,
        PurchaseComponent,
        MealsComponent,
        MealComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes),
        DndModule.forRoot(),
        BrowserAnimationsModule,
        MatMenuModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatRadioModule
    ],
    providers: [ApiRequestsService],
    bootstrap: [AppComponent]
})
export class AppModule { }
