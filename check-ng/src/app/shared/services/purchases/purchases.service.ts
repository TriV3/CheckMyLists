import { Injectable, Inject } from '@angular/core';
import { Purchase } from '../../models/purchase';
import { ApiRequestsService } from '../api-requests.service';



@Injectable()
export class PurchasesService {

    public purchases: Purchase[] = [];
    private purchasesUrl = 'http://localhost:3000/Purchases';

    constructor(private api: ApiRequestsService) {

    }

    get(query = '') {
        return new Promise(resolve => {
            this.api.Get(this.purchasesUrl).subscribe(
                value => {
                    this.purchases = value.json();

                    let data;
                    if (query === 'completed' || query === 'active') {
                        const isCompleted = query === 'completed';
                        data = this.purchases.filter(purchase => purchase.isDone === isCompleted);
                    } else {
                        data = this.purchases;
                    }
                    resolve(data);
                },
                error => {
                    this.purchases = [];
                    resolve(this.purchases);
                });

        });
    }

    add(data: Purchase) {
        return new Promise((resolve, reject) => {
            this.api.Post(this.purchasesUrl, data).subscribe(
                value => {
                    resolve(data);
                },
                error => {

                    reject({});
                });
        });
    }

    replace(data: Purchase) {
        return new Promise((resolve, reject) => {
            this.api.Patch(`${this.purchasesUrl}/${data.id}`, data).subscribe(
                value => {
                    resolve(data);
                },
                error => {

                    reject({});
                });
        });
    }
    replaceAll(data: Purchase[]) {
        return new Promise((resolve, reject) => {
            data.forEach(task => {
                this.replace(task);
            });
        });
    }

    delete(data: Purchase) {
        return new Promise((resolve, reject) => {
            this.api.Delete(`${this.purchasesUrl}/${data.id}`).subscribe(
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
            this.purchases.map(task => {
                if (task.isDone) {
                    this.delete(task)
                        .then(() => resolve(this.purchases))
                        .catch(() => reject());
                }
            });
        });
    }

    InverseDoneTask(data: Purchase) {
        return new Promise((resolve, reject) => {
            data.isDone = !data.isDone;
            this.api.Patch(`${this.purchasesUrl}/${data.id}`, data).subscribe(
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
            this.purchases.forEach(task => {
                task.isDone = state;
                this.replace(task)
                    .then(() => resolve(this.purchases))
                    .catch(() => reject());
            });
        });
    }
}
