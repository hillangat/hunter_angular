import { Observable } from 'rxjs/Observable';
import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { tasks } from '../data/mocked-tasks';
import { clients } from '../data/mocked-clients';
import { taskHistory } from '../data/mocked-task-history';
import { ServerStatusResponse, ServerStatuses } from '../beans/server-status-response';
import { TaskCloneModel } from '../beans/clone-task-model';


import 'rxjs/add/operator/map';
import { LoggerService } from '../common/logger.service';
import { HunterServerResponse } from '../beans/ServerResponse';

@Injectable()

export class TasksService {

  private taskBaseURL = 'http://localhost:8080/Hunter/task/';
  private cloneTaskURL = this.taskBaseURL + 'action/clone';
  private tasks: any[];
  private getTasksURL = 'http://localhost:8080/Hunter/restful/tasks/read';
  private currAccessToke = 'YWRtaW46OTk5OTk5';
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

  public getClientTaskData() {
    return tasks;
  }

  public getTaskHistoryForTaskId( taskId: number ) {
    const events = taskHistory[0].events;
    return events;
  }

  public getTaskForTaskId(taskId: number) {
    const tasks = this.getClientTaskData();
    for ( let i = 0; i < tasks.length; i++ ) {
      const task = tasks[i];
      if ( task.taskId === taskId ) {
        return task;
      }
    }
    return null;
  }

  public getTaskHistoryForTask(taskId: number) {

  }

  public cloneTask<ServerStatusResponse>( cloneTask: TaskCloneModel ) {
    this.logger.log( 'Cloning task...' );
    const response = new ServerStatusResponse();
    response.status  = 'Failed';
    response.message = 'Task name already taken!';
    this.logger.log( 'Response from cloning...' + JSON.stringify(response) );
    return response;
  }

  public getAllTaskIds() {
    const taskIds = [];
    for ( let i = 0; i < this.tasks.length; i++ ) {
      const taskId = this.tasks[i];
      taskIds.push(taskId);
    }
    return taskIds;
  }

  public getClients() {
    return clients;
  }


  public getNewTask() {
    return {
        'description': 'asdfasdf',
        'taskDateline': '2017-05-26 20:03',
        'taskApproved': true,
        'taskApprover': 'admin',
        'updatedBy': 'admin',
        'srlzdTskPrcssJbObjsFilLoc': null,
        'taskDeliveryStatus': 'Failed',
        'desiredReceiverCount': 1,
        'taskLifeStatus': 'Processed',
        'availableReceiverCount': 0,
        'confirmedReceiverCount': 0,
        'taskName': 'dasdfasdf',
        'taskId': 4,
        'taskGroups': [],
        'clientId': 1,
        'taskRegions': [],
        'taskMessage': {
            'toPhone': null,
            'pageWordCount': 0,
            'fromPhone': null,
            'pageable': false,
            'text': null,
            'disclaimer': null,
            'provider': {
                'providerId': 1,
                'providerName': 'Safaricom',
                'cstPrAudMsg': 2,
                'cstPrTxtMsg': 1
            },
            'msgDeliveryStatus': 'Conceptual',
            'actualReceivers': 5000,
            'confirmedReceivers': 0,
            'desiredReceivers': 0,
            'msgId': 4,
            'msgLifeStatus': 'Processed',
            'msgText': 'asdfasdfasdf',
            'createdBy': 'admin',
            'lastUpdate': '2017-05-26 20:55',
            'lastUpdatedBy': 'admin',
            'cretDate': '2017-05-26 20:03',
            'msgOwner': 'admin',
            'msgSendDate': '2017-05-26 20:56',
            'msgTaskType': 'Text'
        },
        'tskMsgType': 'Text',
        'tskAgrmntLoc': null,
        'createdBy': 'admin',
        'taskType': 'Political',
        'lastUpdate': '2017-05-26 20:57',
        'processedBy': null,
        'processedOn': null,
        'recurrentTask': true,
        'gateWayClient': 'CM',
        'taskObjective': 'asdfasdf',
        'taskCost': 0,
        'taskBudget': 10000,
        'cretDate': '2017-05-26 20:03'
    }
  }






}

