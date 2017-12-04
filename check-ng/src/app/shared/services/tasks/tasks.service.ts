import { Injectable, Inject } from '@angular/core';
import { Task } from '../../models/task';
import { ApiRequestsService } from '../api-requests.service';



@Injectable()
export class TasksService {

    public tasks: Task[] = [];
    private TaskUrl = 'http://localhost:3000/Tasks';

    constructor(private api: ApiRequestsService) {

    }

    get(query = '') {
        return new Promise(resolve => {
            this.api.Get(this.TaskUrl).subscribe(
                value => {
                    this.tasks = value.json();

                    let data;
                    if (query === 'completed' || query === 'active') {
                        const isCompleted = query === 'completed';
                        data = this.tasks.filter(todo => todo.isDone === isCompleted);
                    } else {
                        data = this.tasks;
                    }
                    resolve(data);
                },
                error => {
                    this.tasks = [];
                    resolve(this.tasks);
                });

        });
    }

    add(data: Task) {
        return new Promise((resolve, reject) => {
            this.api.Post(this.TaskUrl, data).subscribe(
                value => {
                    resolve(data);
                },
                error => {

                    reject({});
                });
        });
    }

    replace(data: Task) {
        return new Promise((resolve, reject) => {
            this.api.Patch(`${this.TaskUrl}/${data.id}`, data).subscribe(
                value => {
                    resolve(data);
                },
                error => {

                    reject({});
                });
        });
    }
    replaceAll(data: Task[]) {
        return new Promise((resolve, reject) => {
            data.forEach(task => {
                this.replace(task);
            });
        });
    }

    delete(data: Task) {
        return new Promise((resolve, reject) => {
            this.api.Delete(`${this.TaskUrl}/${data.id}`).subscribe(
                value => {
                    resolve(data.id);
                },
                error => {
                    reject({});
                });
        });
    }

    deleteCompleted() {
        return new Promise((resolve, reject) => {
            this.tasks.map(task => {
                if (task.isDone) {
                    this.delete(task)
                        .then(() => resolve(this.tasks))
                        .catch(() => reject());
                }
            });
        });
    }

    InverseDoneTask(data: Task) {
        return new Promise((resolve, reject) => {
            data.isDone = !data.isDone;
            this.api.Patch(`${this.TaskUrl}/${data.id}`, data).subscribe(
                value => {
                    resolve(data);
                },
                error => {

                    reject({});
                });
        });
    }

    setTodosState(state: boolean) {
        return new Promise((resolve, reject) => {
            this.tasks.forEach(task => {
                task.isDone = state;
                this.replace(task)
                    .then(() => resolve(this.tasks))
                    .catch(() => reject());
            });
        });
    }
}
