import { Injectable } from '@angular/core';
import { ApiRequestsService } from '../api-requests.service';
import { GlobalService } from '../global.service';
import { Note } from '../../models/note';

@Injectable()
export class NotesService {

    public databaseData = new Note();
    private apiUrl = 'Note';
    constructor(private api: ApiRequestsService, private gs: GlobalService) {
        this.apiUrl = this.gs.apiBaseUrl + this.apiUrl;
    }

    get() {
        return new Promise(resolve => {
            this.api.Get(this.apiUrl).subscribe(
                value => {
                    this.databaseData = value.json();
                    resolve(this.databaseData as Note);
                },
                error => {
                    this.databaseData = new Note();
                    resolve(this.databaseData);
                });

        });
    }

    replace(data) {
        return new Promise((resolve, reject) => {
            this.api.Post(`${this.apiUrl}`, data).subscribe(
                value => {
                    resolve(data);
                },
                error => {

                    reject({});
                });
        });
    }

}
