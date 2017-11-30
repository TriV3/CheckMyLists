import { Injectable } from '@angular/core';

let tasks = [
    { _id: 1, title: 'Install Angular CLI', isDone: true },
    { _id: 2, title: 'Style app', isDone: true },
    { _id: 3, title: 'Finish service functionality', isDone: false },
    { _id: 4, title: 'Setup API', isDone: false },
];

@Injectable()
export class TasksService {

    constructor() { }

    get(query = '') {
        return new Promise(resolve => {
            let data;
            if (query === 'completed' || query === 'active') {
                const isCompleted = query === 'completed';
                data = tasks.filter(todo => todo.isDone === isCompleted);
            } else {
                data = tasks;
            }
            resolve(data);
        });
    }

    add(data) {
        return new Promise(resolve => {
            tasks.push(data);
            resolve(data);
        });
    }

    put(data) {
        return new Promise(resolve => {
            const index = tasks.findIndex(task => task._id === data._id);
            resolve(data);
        });
    }

    delete(id) {
        return new Promise(resolve => {
            const index = tasks.findIndex(task => task._id === id);
            tasks.splice(index, 1);
            resolve(true);
        });
    }

    deleteCompleted() {
        return new Promise(resolve => {
            tasks = tasks.filter(task => !task.isDone);
            resolve(tasks);
        });
    }

    InverseDoneTodo(data) {
        return new Promise(resolve => {
            const index = tasks.findIndex(task => task._id === data._id);
            tasks[index].isDone = !tasks[index].isDone;

            resolve(true);
        });
    }

    setTodosState(state: boolean) {
        return new Promise(resolve => {
            tasks.forEach(element => {
                element.isDone = state;
            });
            resolve(tasks);
        });
    }
}
