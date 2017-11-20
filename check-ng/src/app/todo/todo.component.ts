import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoService } from './todo.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss'],
    providers: [TodoService]
})
export class TodoComponent implements OnInit {


    public todos;
    public activeTasks;
    private path;
    public areAllSelected = false;

    public filterType = 'All';

    private editingTodo: any = null;

    showDialog = false;
    fieldValue = '';
    okButtonText = 'Create task';
    modalTitle = 'New task';


    constructor(private todoService: TodoService, private route: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.getTodos();
    }

    todoDialog(todo = null) {
        this.okButtonText = 'Create task';
        this.modalTitle = 'New task';
        this.fieldValue = '';
        this.editingTodo = todo;
        if (todo) {
            this.fieldValue = todo.title;
            this.okButtonText = 'Edit task';
            this.modalTitle = 'Edit task';
        }
        this.showDialog = true;
    }

    hideDialog() {
        this.showDialog = false;
        this.editingTodo = null;
        this.fieldValue = null; // make sure Input is new
    }

    getTodos(query = '') {
        return this.todoService.get(query).then(todos => {
            this.todos = todos;
            this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
            this.changeDetectorRef.markForCheck();
        });
    }

    addTodo(title) {
        if (!title || title === '') {
            this.hideDialog();
            return;
        }
        title = title.trim();
        this.todoService.add({ title: title, isDone: false }).then(() => {
            return this.getTodos();
        }).then(() => {
            this.hideDialog();
        });
    }

    updateTodo(todo, newValue) {
        todo.title = newValue;
        return this.todoService.put(todo).then(() => {
            todo.editing = false;
            return this.getTodos();
        });
    }

    // updateTodo(title) {
    //     if (title) {
    //         title = title.trim();
    //         if (this.editingTodo) {
    //             this.editTodo(title);
    //         } else {
    //             this.addTodo(title);
    //         }
    //     }
    //     this.hideDialog();
    // }

    destroyTodo(todo) {
        this.todoService.delete(todo._id).then(() => {
            return this.getTodos();
        });
    }

    clearCompleted() {

        this.todoService.deleteCompleted().then(() => {
            return this.getTodos();
        });
    }

    checkTodo(todo) {
        this.todoService.InverseDoneTodo(todo).then(() => {
            return this.getTodos();
        });
    }

    setTodosState() {
        this.areAllSelected = !this.areAllSelected;
        console.log(this.areAllSelected);

        this.todoService.setTodosState(this.areAllSelected).then(() => {
            return this.getTodos();
        });

    }

    filter(type: string) {
        this.filterType = type;
    }

}
