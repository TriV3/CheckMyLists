import { Injectable, Inject } from '@angular/core';
import { Purchase } from '../../models/purchase';
import { ApiRequestsService } from '../api-requests.service';
import { GlobalService } from '../global.service';


@Injectable()
export class PurchasesService {

    public databaseData: Purchase[] = [];
    private apiUrl = 'Purchases';

    constructor(private api: ApiRequestsService, private gs: GlobalService) {
        this.apiUrl = this.gs.apiBaseUrl + '/' + this.apiUrl;
        console.log(this.apiUrl);
    }

    get(query = '') {
        return new Promise(resolve => {
            this.api.Get(this.apiUrl).subscribe(
                value => {
                    this.databaseData = value.json();

                    let result;
                    if (query === 'completed' || query === 'active') {
                        const isCompleted = query === 'completed';
                        result = this.databaseData.filter(val => val.isDone === isCompleted);
                    } else {
                        result = this.databaseData;
                    }
                    resolve(result);
                },
                error => {
                    this.databaseData = [];
                    resolve(this.databaseData);
                });

        });
    }

    add(data) {
        return new Promise((resolve, reject) => {
            this.api.Post(this.apiUrl, data).subscribe(
                value => {
                    resolve(data);
                },
                error => {

                    reject({});
                });
        });
    }

    replace(data) {
        return new Promise((resolve, reject) => {
            this.api.Patch(`${this.apiUrl}/${data.id}`, data).subscribe(
                value => {
                    resolve(data);
                },
                error => {

                    reject({});
                });
        });
    }

    replaceAll(data) {
        return new Promise((resolve, reject) => {
            data.forEach(val => {
                this.replace(val);
            });
        });
    }

    delete(data) {
        return new Promise((resolve, reject) => {
            this.api.Delete(`${this.apiUrl}/${data.id}`).subscribe(
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
            this.databaseData.map(value => {
                if (value.isDone) {
                    this.delete(value)
                        .then(() => resolve(this.databaseData))
                        .catch(() => reject());
                }
            });
        });
    }

    ToggleComplete(data) {
        return new Promise((resolve, reject) => {
            data.isDone = !data.isDone;
            this.api.Patch(`${this.apiUrl}/${data.id}`, data).subscribe(
                value => {
                    resolve(data);
                },
                error => {

                    reject({});
                });
        });
    }

    setAllState(state: boolean) {
        return new Promise((resolve, reject) => {
            this.databaseData.forEach(value => {
                value.isDone = state;
                this.replace(value)
                    .then(() => resolve(this.databaseData))
                    .catch(() => reject());
            });
        });
    }
}
