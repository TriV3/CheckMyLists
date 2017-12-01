import { Injectable } from '@angular/core';
import { Task } from '../../models/task';

let tasks: Task[]  = [];

@Injectable()
export class TasksService {

    constructor() {
        tasks.push(new Task(1, 'Install Angular CLI', true));
        tasks.push(new Task(2, 'Style app', true));
        tasks.push(new Task(3, 'Finish service functionality', false));
        tasks.push(new Task(4, 'Setup API', false));
    }

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
            // Get max id
            const max = tasks.reduce((prev, current) => {
                return (prev._id > current._id) ? prev : current;
            })._id;
            data._id = max + 1;
            tasks.push(data);
            resolve(data);
        });
    }

    put(data) {
        return new Promise(resolve => {
            const index = tasks.findIndex(task => task._id === data._id);
            tasks[index] = data;
            resolve(tasks[index]);
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

    InverseDoneTask(data) {
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
