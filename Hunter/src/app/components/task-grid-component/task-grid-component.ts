import { Component, OnInit,Input, ViewChild,ElementRef,Renderer } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TasksGridHeaders } from '../../data/tasks-grid-headers';
import { HunterTableConfig } from '../../beans/hunter-table-configs';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertService } from '../../services/alert-service';
import { Alert, AlertType } from '../../beans/alert';



@Component({
  moduleId:module.id,
  selector: 'task-grid',
  templateUrl: 'task-grid-component.html',
  styleUrls:   ['task-grid-component.css'],
  providers: [ TasksService ]
})
export class TaskGridComponent implements OnInit {

  @ViewChild('cloneTask') cloneTaskComponent;
  
  tasks:any[];
  headers:HunterTableConfig[] = TasksGridHeaders;

  currFunc:string = null;
  currDataId:number = null;
  index:number;
  popupModalTitle:string = 'Delete Task History';
  cloneTitle:string = "Clone Selected Task";
  
  modalAction:string = null;
  selActionDispName:string = null;

  isCloningTask:boolean = false;
  
  
  constructor( 
    private taskService:TasksService, 
    private route:ActivatedRoute,  
    private router: Router, 
    private alertService:AlertService 
  ){}

  alertError( message : string ){    
    this.alertService.error( message, false );
  }

  alertWarning( message : string ){    
    this.alertService.warn( message, false );
  }
  
  alertSuccess( message : string ){    
    this.alertService.success( message, false );
  }
  
  alertInfo( message : string ){    
    this.alertService.info( message, false );
  }

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
          this.modalAction = "DeleteTask";
          this.selActionDispName = "Delete";
          this.showModal();
          break;
        case 'edit' : 
          console.log( 'Editing task not allowed here. Doing nothing' );
          this.selActionDispName = "Edit";
          break;
        case 'process' : 
          this.modalAction = "ProcessTask"
          this.selActionDispName = "Process";
          this.showModal();
          break;
        case 'open' : 
          this.router.navigateByUrl('taskdetails/' + this.currDataId);
          this.selActionDispName = "Open";
          break;
        case 'clone' :
          this.modalAction = "CloneTask"
          this.cloneTaskComponent.showModal();
          this.selActionDispName = "Clone";
          this.showModal(); 
          break;
      }

  }

  getCurrTaskIdAndSetIndex(){
        for(var i=0; i<this.tasks.length; i++ ){
          var historyId = this.tasks[i].taskId;
          if( historyId == this.currDataId ){
            this.currDataId = historyId;
            this.index = i;
          }
        }
  }

   performSelAction(){
        this.getCurrTaskIdAndSetIndex();       
        this.hideModal();
        switch( this.modalAction ){
          case 'DeleteTask' :                         
            this.deleteTask();
            break;
          case 'EditTask' : 
            console.log( 'Editing task not allowed here. Doing nothing' );
            break;
          case 'ProcessTask' :             
            this.processTask();
            break;          
          case 'CloneTask' :
            this.cloneTask();
            break;
      }
    }

    deleteTask(){
      console.log( 'Deleting tasks....index = ' + this.index );
      this.tasks.splice( this.index, 1 );   
      this.alertSuccess( "Successfully deleted task!" );   
    }

    processTask(){
      this.alertError( 'This action is not currently supported!' );
    }
  
    cloneTask(){
      this.alertError( 'This action is not currently supported!' );
    }

    getActionIcon(){
      console.log( 'getting action icon for action = ' + this.currFunc );
      var icon = "glyphicon glyphicon-";
      switch( this.modalAction ){
        case 'CloneTask': return icon + 'book';
        case 'ProcessTask' : return icon + 'play';
        case 'EditTask' : return icon + 'pencil';
        case 'DeleteTask' : return icon + 'remove';
        default:
          console.log( 'No action found!!' );
        break;
      }
    }

    getActionButtonClass(){
      let class_ = "btn btn-";
      return this.modalAction == 'DeleteTask' ? class_ + "danger" : class_ + "success";
    }

    
    @ViewChild('autoShownModal') 
    public autoShownModal:ModalDirective;

    public isModalShown:boolean = false;
    
    public showModal():void {
        this.isModalShown = true;
    }
    
    public hideModal():void {
        this.autoShownModal.hide();
    }
    
    public onHidden():void {
        this.isModalShown = false;
    }

  



  





}
