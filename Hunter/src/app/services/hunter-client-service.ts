

import { Injectable, OnInit } from '@angular/core';
import {Headers, Http, Response, Request, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Clients } from 'app/beans/clients';
import { User } from '../beans/User';
import { Client } from '../beans/client';
import { HunterServerResponse } from '../beans/ServerResponse';
import { LoggerService } from '../common/logger.service';

@Injectable()
export class HunterClientService implements OnInit {

    private base = 'http://localhost:8080/Hunter/restful/client/action/angular/';
    private readClientsURL  = this.base + 'read';
    private removeClientURL = this.base + 'remove';
    private updateClientURL = this.base + 'update';
    private createUpdateURL = this.base + 'create';

    private user: User = {
        userName : 'admin',
        password: '999999',
        firstName: null,
        lastName: null,
        key: null,
        roles: null
    };

    public ngOnInit() {

    }

    constructor( private http: Http, private logger: LoggerService ) { }

    getAllClients(): Promise<HunterServerResponse> {
        const headers = this.getHeaders();
        const creds   = this.getReqParams();
        return this.http.post(this.base + 'read', creds, {headers: headers} )
            .toPromise()
            .then(response => response.json() as HunterServerResponse)
            .catch(this.handleError);
    }

    public removeClient( clientId: number ): Promise<HunterServerResponse> {
        const headers = this.getHeaders();
        const creds   = this.getReqParams();
        return this.http.post(this.removeClientURL, {clientId: clientId}, {headers: headers} )
            .toPromise()
            .then(response => response.json() as Client[])
            .catch(this.handleError);
    }

    public createClient( client: Client ) {
        const headers = this.getHeaders();
        const creds   = this.getReqParams();
        return this.http.post(this.createUpdateURL, client, {headers: headers} )
            .toPromise()
            .then(response => response.json() as HunterServerResponse)
            .catch(this.handleError);
    }

    public updateClient( client: Client ): Promise<HunterServerResponse> {
        const headers = this.getHeaders();
        return this.http.post(this.updateClientURL, client, {headers: headers} )
            .toPromise()
            .then(response => response.json() as HunterServerResponse)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        this.logger.error('An error occurred' + JSON.stringify(error)); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    public getReqParams() {
        return {
            type: 'ALL',
            colName: '',
            orderType: '',
            startNo: '',
            count: 0
        }
    }

    public getHeaders(): Headers  {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

}
