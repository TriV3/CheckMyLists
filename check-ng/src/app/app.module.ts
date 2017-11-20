import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatMenuModule, MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule,
    MatCheckboxModule, MatRadioModule
} from '@angular/material';

import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

import { TasksFilterPipe } from './tasks-filter.pipe';

const routes: Routes = [
    { path: '**', component: TodoComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        TodoComponent,
        TaskDialogComponent,
        TasksFilterPipe
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
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
