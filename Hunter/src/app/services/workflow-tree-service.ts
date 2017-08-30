import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import { WorkflowStep } from '../beans/workflow-tree';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WorkflowTreeService {

    private wtURL = 'api/workflowtree'; 
    
    constructor(private http: Http) { }

    getWorkflowTrees(): Promise<WorkflowStep[]> {
        return new Promise(resolve => {
            return this.http.get(this.wtURL)
                .toPromise()
                .then(response => response.json().data as WorkflowStep[])
                .catch(this.handleError);
        });
    }

      private handleError(error: any): Promise<any> {
        alert('An error occurred' + JSON.stringify(error)); // for demo purposes only
        return Promise.reject(error.message || error);
      }

}