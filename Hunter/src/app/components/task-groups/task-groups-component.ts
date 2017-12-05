
import { Component, Input, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { taskGroups } from '../../data/mocked-task-groups';
import { HunterTableConfig } from '../../beans/hunter-table-configs';
import { TasksGroupHeaders } from '../../data/task-groups-headers';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert-service';
import { Alert, AlertType } from '../../beans/alert';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
    moduleId: module.id,
    selector: 'app-task-groups',
    templateUrl: 'task-groups-component.html',
    styleUrls: ['task-groups-component.css']
})

export class TasksGroupsComponent implements OnInit {

    @Input('taskGroups') taskGroups: any;
    @ViewChild('confirmAlert') confirmAlert;
    @ViewChild('hunterTableConfig') hunterTableConfig;

     taskGroups_: any = taskGroups;
     addingGroup = false;
     headers: HunterTableConfig[] = TasksGroupHeaders;

    currFunc: string = null;
    currDataId: number = null;
    index: number;
    popupModalTitle = 'Delete Task History';
    confirmingDelete = false;

    constructor(
        private taskService: TasksService,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService  ) {
    }

    public ngOnInit() {

    }

    loadTask() {

    }

    setAddingGroup() {
        this.addingGroup = !this.addingGroup;
    }

    addGroupAndSave() {
        this.setAddingGroup();
    }

    handleGridAction(params: any[]) {

      this.currFunc   = params[0];
      this.currDataId = params[1];
      this.index      = -1;

      this.getCurrGroupIdAndSetIndex();

      switch ( this.currFunc ) {
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

  getCurrGroupIdAndSetIndex() {
        for ( let i = 0; i < this.taskGroups_.length; i++ ) {
          const groupId = this.taskGroups_[i].groupId;
          if ( groupId === this.currDataId ) {
            this.currDataId = groupId;
            this.index = i;
          }
        }
  }

  getCurrentDataId() {
    return this.currDataId;
  }

  closeConfirmAlertModal() {
    this.confirmingDelete = false;
    this.confirmAlert.hideModal();
    this.hunterTableConfig.initializeDataGrid();
  }

  onConfirm( params: any[] ) {

    console.log( JSON.stringify(params) );

    const type = params[0];
    const marker = params[1];
    const dataId = params[2];

    if ( marker === 'RemoveGroup' && type === 'yes' ) {
      this.removeGroupWithId( dataId );
      this.closeConfirmAlertModal();
    } else if ( marker === 'RemoveGroup' && type === 'no' ) {
      this.closeConfirmAlertModal();
    }

  }

  removeGroupWithId( groupId: number ) {
      let index = -1;
      for ( let i = 0; i < this.taskGroups_.length; i++ ) {
        const group = this.taskGroups_[i];
        console.log( JSON.stringify(group) );
        if ( group.groupId === groupId ) {
          index = i;
          break;
        }
      }
      if ( index !== -1 ) {
        this.taskGroups_.splice( index, 1 );
        this.taskGroups.splice(index, 1 );
        this.alertService.success('Task group successfully deleted', false);
      }
    }


}
