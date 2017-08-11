
import { Component, Input, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { taskGroups } from '../../data/mocked-task-groups';
import { HunterTableConfig } from '../../beans/hunter-table-configs';
import { TasksGroupHeaders } from '../../data/task-groups-headers';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertService } from '../../services/alert-service';
import { Alert, AlertType } from '../../beans/alert';


@Component({
    moduleId:module.id,
    selector:'task-groups',
    templateUrl:'task-groups-component.html',
    styleUrls:['task-groups-component.css'] 
})

export class TasksGroupsComponent{
    
     @Input() taskGroups: any;     
    @ViewChild('confirmAlert') confirmAlertComponent;
    
     taskGroups_ :any = taskGroups;
     addingGroup:boolean = false;
     headers : HunterTableConfig[] = TasksGroupHeaders;

    currFunc:string = null;
    currDataId:number = null;
    index:number;
    popupModalTitle:string = 'Delete Task History';
    confirmingDelete:boolean = false;

    
     

    constructor( private taskService:TasksService,private route:ActivatedRoute,  private router: Router,private alertService:AlertService  ){

    }

    ngOnInit() {
        
    }

    loadTask(){
        
    }

    setAddingGroup(){
        this.addingGroup = !this.addingGroup;
    }

    addGroupAndSave(){
        this.setAddingGroup(); 
    }
    
    handleGridAction(params:any[]){
      
      
      this.currFunc   = params[0]; 
      this.currDataId = params[1];
      this.index      = -1;     
      
      this.getCurrGroupIdAndSetIndex(); 

      switch( this.currFunc ){          
        case 'NewRecord' : 
            this.setAddingGroup();
            break;
        case 'delete' : 
          this.confirmingDelete = true;
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

  getCurrGroupIdAndSetIndex(){
        for(var i=0; i<this.taskGroups.length; i++ ){
          var groupId = this.taskGroups[i].groupId;
          if( groupId == this.currDataId ){
            this.currDataId = groupId;
            this.index = i;
          }
        }
  }

  getCurrentDataId(){
    return this.currDataId;
  }

  closeConfirmAlertModal(){
    this.confirmingDelete = false;
  }

  onConfirm( params:any[] ){
    console.log( JSON.stringify(params) );    
    let type = params[0];
    let marker = params[1];
    let dataId = params[2];
    
    if( marker == 'RemoveGroup' && type == 'yes' ){      
      this.removeGroupWithId( dataId );
      this.confirmAlertComponent.hideModal();
    }else if( marker == 'RemoveGroup' && type == 'no' ){
      this.confirmAlertComponent.hideModal();
    }

  }

  removeGroupWithId( groupId:number ){
    
    if( this.taskGroups && this.taskGroups.length > 0 ){
      var index = -1;
      for( var i=0; i<this.taskGroups.length; i++ ){
        var group = this.taskGroups[i];
        console.log( "group.groupId = " + group.groupId );
        if( group.groupId == groupId ){
          index = i;
          break;
        }
      }
      if( index != -1 ){
        this.taskGroups.splice( index, 1 );
        console.log( 'splicing....' );
        this.alertService.success('Task group successfully deleted', false);
      }
    }
  }


}
