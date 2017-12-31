import { Observable } from 'Rxjs';
import { HunterServerResponse } from './../beans/ServerResponse';
import { TaskFieldsModel } from './../beans/task-field-model';
import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { tasks } from '../data/mocked-tasks';
import { clients } from '../data/mocked-clients';
import { taskHistory } from '../data/mocked-task-history';
import { ServerStatusResponse, ServerStatuses } from '../beans/server-status-response';
import { TaskCloneModel } from '../beans/clone-task-model';


import 'rxjs/add/operator/map';
import { LoggerService } from '../common/logger.service';

@Injectable()

export class TasksService {

  private taskBaseURL = 'http://localhost:8080/Hunter/task/';
  private deleteTaskURL = this.taskBaseURL + 'action/task/destroy';
  private cloneTaskURL = this.taskBaseURL + 'action/task/clone';
  private updateTaskFieldsURL = this.taskBaseURL + 'action/updateFields';
  private createOrUpdateTaskFieldsURL = this.taskBaseURL + 'action/createOrUpdate';
  private loadTaskForTaskURL = this.taskBaseURL + 'action/task/load/';
  private furnishTaskURL = this.taskBaseURL + 'action/task/furnish/';
  private taskHistoryURL = this.taskBaseURL + 'action/task/history/getForTask/';
  private getAvailTaskGroups = this.taskBaseURL + 'action/task/availGroups/';
  private addGrpToTask = this.taskBaseURL + 'action/tskGrp/create';
  private currAccessToke = 'YWRtaW46OTk5OTk5';
  private getTasksURL = 'http://localhost:8080/Hunter/restful/tasks/read';
  private getAllTasksURL = this.getTasksURL + '/all';

  constructor( private http: Http, private logger: LoggerService ) {}

  public getAllTasks(): Observable<HunterServerResponse> {
    return  this.http
                .get( this.getAllTasksURL )
                .map( (response: Response) => response.json() as HunterServerResponse );
  }

  public getClientTasks( clientId: number ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const t = localStorage.getItem('accessToken');
    headers.append('Authorization', 'Basic YWRtaW46OTk5OTk5');
    headers.append('JSESSIONID', 'C0C457A0BCC9CFE8E5273C18C27E451A');
    const body = JSON.stringify(null);

    return this.http.post(this.getTasksURL + clientId, body, { headers: headers })
      .map((response) => {
        const result = response.json();
        return result;
      }).subscribe(response => {
        this.logger.log( response );
      });
  }

  public getAvailTskGrpsForTskId( taskId: number ): Observable<HunterServerResponse> {
    return (
      this.http
          .get( this.getAvailTaskGroups + taskId )
          .map( (response: Response) => response.json() as HunterServerResponse)
    );
  }

  public getClientTaskData() {
    return tasks;
  }


  public createOrUpdateTask( fieldsModel: TaskFieldsModel ): Observable<ServerStatusResponse> {
    return (
      this.http
          .post( this.createOrUpdateTaskFieldsURL, JSON.stringify( fieldsModel ) )
          .map( (response: Response) => response.json() as ServerStatusResponse)
    );
  }

  public getTaskHistoryForTaskId( taskId: number ): Observable<HunterServerResponse> {
    return (
      this.http
          .get( this.taskHistoryURL + taskId )
          .map( (response: Response) => response.json() as HunterServerResponse)
    );
  }

  public loadTaskForId(taskId: number): Observable<HunterServerResponse> {
    return (
      this.http
          .get( this.loadTaskForTaskURL + taskId )
          .map( ( response: Response ) => response.json() as HunterServerResponse )
    );
  }

  public furnishTask(taskId: number): Observable<HunterServerResponse> {
    return (
      this.http
          .get( this.furnishTaskURL + taskId )
          .map( ( response: Response ) => response.json() as HunterServerResponse )
    );
  }

  public cloneTask( cloneTask: TaskCloneModel ): Observable<ServerStatusResponse> {
    return (
      this.http
          .post( this.cloneTaskURL, JSON.stringify(cloneTask) )
          .map( ( resp: Response) => resp.json() as ServerStatusResponse )
    );
  }

  public deleteTask( taskId: number ): Observable<ServerStatusResponse> {
    return (
      this.http
          .post( this.deleteTaskURL, JSON.stringify({ taskId: taskId }) )
          .map( ( resp: Response) => resp.json() as ServerStatusResponse )
    );
  }

  public addGroupToTask( taskId: number, groupIds: number[] ): Observable<ServerStatusResponse> {
    return (
      this.http
          .post( this.addGrpToTask, JSON.stringify({ taskId: taskId, groupIds: groupIds }) )
          .map( ( resp: Response) => resp.json() as ServerStatusResponse )
    );
  }

  public getClients() {
    return clients;
  }








}

