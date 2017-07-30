import { Component, OnInit,Input, ViewChild,ElementRef,Renderer } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TasksGridHeaders } from '../../data/tasks-grid-headers';
import { HunterTableConfig } from '../../beans/hunter-table-configs';
import { ActivatedRoute,Router } from '@angular/router';



@Component({
  moduleId:module.id,
  selector: 'task-grid',
  templateUrl: 'task-grid-component.html',
  styleUrls:   ['task-grid-component.css'],
  providers: [ TasksService ]
})
export class TaskGridComponent implements OnInit {

  
  tasks:any[];
  headers:HunterTableConfig[] = TasksGridHeaders;

  currFunc:string = null;
  currDataId:number = null;
  index:number;
  popupModalTitle:string = 'Delete Task History';
  
  

  constructor( private taskService:TasksService, private route:ActivatedRoute,  private router: Router ){}

  ngOnInit(){      
      this.tasks = this.taskService.getClientTaskData();      
  }


  handleGridAction(params:any[]){
      
      
      this.currFunc   = params[0]; 
      this.currDataId = params[1];
      this.index      = -1;     
      
      this.getCurrTaskIdAndSetIndex(); 

      switch( this.currFunc ){
        case 'delete' : 
          alert( 'Deleting...' + this.currDataId );
          break;
        case 'edit' : 
          alert( 'Editing...' + this.currDataId );
          break;
        case 'process' : 
          alert( 'Processing...' + this.currDataId );
          break;
        case 'open' : 
          this.router.navigateByUrl('taskdetails/' + this.currDataId);
          break;
        case 'clone' : 
          alert( 'Cloning...' + this.currDataId );
          break;
      }

  }

  getCurrTaskIdAndSetIndex(){
        for(var i=0; i<this.tasks.length; i++ ){
          var historyId = this.tasks[i].historyId;
          if( historyId == this.currDataId ){
            this.currDataId = historyId;
            this.index = i;
          }
        }
  }

  



  





}
