
import { Component,Input } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { taskGroups } from '../../data/mocked-task-groups';

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
    

    constructor( private taskService:TasksService ){

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



}
