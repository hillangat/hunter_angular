import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { tasks } from '../data/mocked-tasks';
import { clients } from '../data/mocked-clients';
import { taskHistory } from '../data/mocked-task-history';
import { ServerStatusResponse, ServerStatuses } from '../beans/server-status-response';
import { TaskCloneModel } from '../beans/clone-task-model';


import 'rxjs/add/operator/map';

@Injectable()

export class TasksService {

  cloneTaskURL:string = "http://localhost:8080/Hunter/task/action/clone";
  tasks:any[];
  getTasksURL = "http://localhost:8080/Hunter/task/action/read/getTasksForClientId/";
  currAccessToke = "YWRtaW46OTk5OTk5";

  constructor( private http:Http ){}

  getTasks(){
    return this.tasks;
  }

  getClientTasks( clientId:number ){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var t = localStorage.getItem("accessToken");
    headers.append("Authorization", "Basic YWRtaW46OTk5OTk5");
    headers.append("JSESSIONID", "C0C457A0BCC9CFE8E5273C18C27E451A");
    var body = JSON.stringify(null);

    return this.http.post(this.getTasksURL + clientId, body, { headers: headers })
      .map((response) => {
        var result = response.json();
        return result;
      }).subscribe(response => {
        console.log( response );
      });
  }

  getClientTaskData(){
    return tasks;
  }

  getTaskHistoryForTaskId( taskId:number ){
    let events = taskHistory[0].events;
    return events;
  }

  getTaskForTaskId(taskId:number){
    let tasks = this.getClientTaskData();
    for( var i=0; i<tasks.length;i++ ){
      let task = tasks[i];
      if( task.taskId == taskId ){
        return task;
      }
    }
    return null;
  }

  getTaskHistoryForTask(taskId:number){

  }

  cloneTask<ServerStatusResponse>( cloneTask:TaskCloneModel ){
    console.log( 'Cloning task...' );    
    let response = new ServerStatusResponse();
    response.status  = 'Failed';
    response.message = "Task name already taken!";    
    console.log( 'Response from cloning...' + JSON.stringify(response) );
    return response;
  }

  getAllTaskIds(){
    var taskIds = [];
    for( var i=0; i<this.tasks.length; i++ ){
      let taskId = this.tasks[i];
      taskIds.push(taskId);
    }
    return taskIds;
  }

  getClients(){
    return clients;
  }


  getNewTask(){
    return {
        "description": "asdfasdf",
        "taskDateline": "2017-05-26 20:03",
        "taskApproved": true,
        "taskApprover": "admin",
        "updatedBy": "admin",
        "srlzdTskPrcssJbObjsFilLoc": null,
        "taskDeliveryStatus": "Failed",
        "desiredReceiverCount": 1,
        "taskLifeStatus": "Processed",
        "availableReceiverCount": 0,
        "confirmedReceiverCount": 0,
        "taskName": "dasdfasdf",
        "taskId": 4,
        "taskGroups": [],
        "clientId": 1,
        "taskRegions": [],
        "taskMessage": {
            "toPhone": null,
            "pageWordCount": 0,
            "fromPhone": null,
            "pageable": false,
            "text": null,
            "disclaimer": null,
            "provider": {
                "providerId": 1,
                "providerName": "Safaricom",
                "cstPrAudMsg": 2,
                "cstPrTxtMsg": 1
            },
            "msgDeliveryStatus": "Conceptual",
            "actualReceivers": 5000,
            "confirmedReceivers": 0,
            "desiredReceivers": 0,
            "msgId": 4,
            "msgLifeStatus": "Processed",
            "msgText": "asdfasdfasdf",
            "createdBy": "admin",
            "lastUpdate": "2017-05-26 20:55",
            "lastUpdatedBy": "admin",
            "cretDate": "2017-05-26 20:03",
            "msgOwner": "admin",
            "msgSendDate": "2017-05-26 20:56",
            "msgTaskType": "Text"
        },
        "tskMsgType": "Text",
        "tskAgrmntLoc": null,
        "createdBy": "admin",
        "taskType": "Political",
        "lastUpdate": "2017-05-26 20:57",
        "processedBy": null,
        "processedOn": null,
        "recurrentTask": true,
        "gateWayClient": "CM",
        "taskObjective": "asdfasdf",
        "taskCost": 0,
        "taskBudget": 10000,
        "cretDate": "2017-05-26 20:03"
    }
  }






}
