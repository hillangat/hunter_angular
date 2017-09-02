import { Injectable } from '@angular/core';
import {Http,Response} from "@angular/http";
import { WorkflowStep } from '../beans/workflow-tree';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WorkflowTreeService {

    private wtURL = 'api/trees'; 
    
    constructor(private http: Http) { }

    getWorkflowTrees(): Promise<WorkflowStep[]> {
        return this.http.get(this.wtURL)
        .toPromise()
        .then(response => response.json().data as WorkflowStep[])
        .catch(this.handleError);
    }

      private handleError(error: any): Promise<any> {
        console.error('An error occurred' + JSON.stringify(error)); // for demo purposes only
        return Promise.reject(error.message || error);
      }

}