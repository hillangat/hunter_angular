import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { tasks } from '../data/mocked-tasks';
import { taskHistory } from '../data/mocked-task-history';


import 'rxjs/add/operator/map';

@Injectable()

export class TasksService {

  tasks:any[];
  getTasksURL = "http://localhost:8080/Hunter/task/action/read/getTasksForClientId/";
  currAccessToke = "YWRtaW46OTk5OTk5";

  constructor( private http:Http ){}

  getTasks(){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Basic ` + btoa("admin:999999"));
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.getTasksURL,null,options).map(
      (response) => response.json()
    ).subscribe(
      (data) => {
        this.tasks = data;
        console.log( this.tasks );
      }
    );
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






}
