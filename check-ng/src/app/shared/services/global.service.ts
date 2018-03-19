import { Injectable } from '@angular/core';
import { ApiRequestsService } from './api-requests.service';
import { promise } from 'protractor';

@Injectable()
export class GlobalService {

    public apiBaseUrl;
    constructor(private apiReq: ApiRequestsService) {
        this.CreateBaseUrl();
    }

    async CreateBaseUrl() {
        this.apiBaseUrl = await this.GetServerURL();
    }

    GetServerURL(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiReq.Get(this.apiReq.confUrl)
                .subscribe(
                    data => {
                        const conf = JSON.parse(data.text());
                        const url = conf.server_url + ':' + conf.Server_port;
                        console.log(url);
                        resolve(url);
                    },
                    error => {
                        reject(`Error importing configuration file.`);
                    }
                );
        });
    }
}
