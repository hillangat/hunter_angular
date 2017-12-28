import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { WorkflowStep } from '../beans/workflow-tree';
import 'rxjs/add/operator/toPromise';
import { HunterServerResponse } from '../beans/ServerResponse';
import { LoggerService } from '../common/logger.service';

@Injectable()
export class WorkflowTreeService {

    private wtURL = 'http://localhost:8080/Hunter/restful/workflow/tree/read';

    constructor( private http: Http, private logger: LoggerService ) { }

    getWorkflowTrees(): Promise<HunterServerResponse> {
      const headers = this.getHeaders();
      const creds   = this.getReqParams();
      return this.http.post(this.wtURL, creds, {headers: headers} )
          .toPromise()
          .then(response => response.json() as HunterServerResponse[])
          .catch(this.handleError);
    }

      private handleError(error: any): Promise<any> {
        this.logger.error('An error occurred' + JSON.stringify(error)); // for demo purposes only
        return Promise.reject(error.message || error);
      }

      public getHeaders(): Headers  {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
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

}
