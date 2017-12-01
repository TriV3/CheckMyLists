import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiRequestsService {

    constructor(private http: Http) { }


    Get(url: string): Observable<Response> {
        return this.http.get(url);
    }

    Post(url: string, data: any): Observable<Response> {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post(url, JSON.stringify(data), { headers: headers });
    }

    Put(url: string, data: any): Observable<Response> {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.put(url, JSON.stringify(data), { headers: headers });
    }

    Patch(url: string, data: any): Observable<Response> {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.patch(url, JSON.stringify(data), { headers: headers });
    }

    Delete(url: string): Observable<Response> {
        return this.http.delete(url);
    }

}
