import { Component, OnInit,Input, ViewChild,ElementRef,Renderer } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { ModalDirective } from 'ngx-bootstrap/modal';



@Component({
  moduleId:module.id,
  selector: 'task-grid',
  templateUrl: 'task-grid-component.html',
  styleUrls:   ['task-grid-component.css'],
  providers: [ TasksService ]
})
export class TaskGridComponent implements OnInit {

  
  tasks:any[];
  

  constructor( private taskService:TasksService ){}

  ngOnInit(){      
      this.tasks = this.taskService.getClientTaskData();      
  }


  orderDataBy( colName ){
    console.log( colName );
  }

  getRandomData(){
    return [
      { id:10,name:"Kip",desc:"Kimargis" },
      { id:2,name:"Robert",desc:"Pluto" },
      { id:3,name:"Kaplang",desc:"Jupiter" },
      { id:12,name:"Richard",desc:"Saturn" },
    ];
  }

  



  





}
