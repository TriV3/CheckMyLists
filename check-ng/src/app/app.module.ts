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
import { TaskDialogComponent } from './shared/components/task-dialog/task-dialog.component';

import { ApiRequestsService } from './shared/services/api-requests.service';

import { TasksFilterPipe } from './shared/filters/tasks-filter.pipe';
import { ArraySortPipe } from './shared/filters/arraySort.pipe';

const routes: Routes = [
    { path: '**', component: TasksComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        TasksComponent,
        TaskDialogComponent,
        TasksFilterPipe,
        ArraySortPipe
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
