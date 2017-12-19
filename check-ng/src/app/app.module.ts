import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatMenuModule, MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule,
    MatCheckboxModule, MatRadioModule, MatMenu, MatOption, MatSelect
} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';

import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskComponent } from './pages/tasks/task/task.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';
import { PurchaseComponent } from './pages/purchases/purchase/purchase.component';
import { MealsComponent } from './pages/meals/meals.component';
import { MealComponent } from './pages/meals/meal/meal.component';

import { TaskDialogComponent } from './shared/components/task-dialog/task-dialog.component';
import { PurchaseDialogComponent } from './shared/components/purchase-dialog/purchase-dialog.component';

import { ApiRequestsService } from './shared/services/api-requests.service';
import { GlobalService } from './shared/services/global.service';

import { CompleteFilterPipe } from './shared/filters/complete-filter.pipe';
import { ArraySortPipe } from './shared/filters/arraySort.pipe';
import { ListContainerComponent } from './shared/components/list-container/list-container.component';
import { MealDialogComponent } from './shared/components/meal-dialog/meal-dialog.component';
import { NotesComponent } from './pages/notes/notes.component';


const routes: Routes = [
    { path: '', redirectTo: 'meals', pathMatch: 'full' },
    { path: 'meals', component: MealsComponent },
    { path: 'notes', component: NotesComponent },
    { path: 'purchases', component: PurchasesComponent },
    { path: 'tasks', component: TasksComponent },
    { path: '**', redirectTo: 'meals', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        TasksComponent,
        TaskDialogComponent,
        CompleteFilterPipe,
        ArraySortPipe,
        TaskComponent,
        PurchasesComponent,
        PurchaseComponent,
        MealsComponent,
        MealComponent,
        PurchaseDialogComponent,
        ListContainerComponent,
        MealDialogComponent,
        NotesComponent
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
        MatRadioModule,
        MatTabsModule
    ],
    providers: [ApiRequestsService, GlobalService],
    bootstrap: [AppComponent]
})
export class AppModule { }
