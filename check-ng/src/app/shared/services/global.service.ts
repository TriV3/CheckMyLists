import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

    public apiBaseUrl = 'http://localhost:3000/';
    constructor() { }

}
