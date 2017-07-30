
import { Component, Input } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { taskGroups } from '../../data/mocked-task-groups';
import { HunterTableConfig } from '../../beans/hunter-table-configs';
import { TasksGroupHeaders } from '../../data/task-groups-headers';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
    moduleId:module.id,
    selector:'task-groups',
    templateUrl:'task-groups-component.html',
    styleUrls:['task-groups-component.css'] 
})

export class TasksGroupsComponent{
    
     @Input() taskGroups: any;     
     taskGroups_ :any = taskGroups;
     addingGroup:boolean = false;
     headers : HunterTableConfig[] = TasksGroupHeaders;

    currFunc:string = null;
    currDataId:number = null;
    index:number;
    popupModalTitle:string = 'Delete Task History';
     

    constructor( private taskService:TasksService,private route:ActivatedRoute,  private router: Router ){

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

  getCurrGroupIdAndSetIndex(){
        for(var i=0; i<this.taskGroups.length; i++ ){
          var groupId = this.taskGroups[i].groupId;
          if( groupId == this.currDataId ){
            this.currDataId = groupId;
            this.index = i;
          }
        }
  }


}
