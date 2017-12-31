import { ServerStatuses } from './../../beans/server-status-response';
import { HunterTableSelItem } from './../../beans/HunterTableSelItem';
import { HunterServerResponse } from './../../beans/ServerResponse';

import { Component, Input, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { taskGroups } from '../../data/mocked-task-groups';
import { HunterTableConfig } from '../../beans/hunter-table-configs';
import { TasksGroupHeaders } from '../../data/task-groups-headers';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert-service';
import { Alert, AlertType } from '../../beans/alert';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { LoggerService } from '../../common/logger.service';
import BarAction from '../hunter-table-component/shared/BarAction';
import HunterTableUtil from '../hunter-table-component/shared/HunterTableUtil';
import { ActionTypeEnum } from '../hunter-table-component/shared/ActionTypeEnum';
import { BActionDisplayEnum } from '../hunter-table-component/shared/BActionDisplayEnum';
import { OverlayService } from '../../services/overlay-service';
import { HunterTableComponent } from 'app/components/hunter-table-component/hunter-table';
import Utility from 'app/utilities/Utility';
import { ServerStatusResponse } from '../../beans/server-status-response';
import { SelField } from '../../beans/SelField';


@Component({
    moduleId: module.id,
    selector: 'app-task-groups',
    templateUrl: './task-groups-component.html',
    styleUrls: ['./task-groups-component.css']
})

export class TasksGroupsComponent implements OnInit {

  @Input('taskId') taskId: number;
  @Input('taskGroups') taskGroups: any;
  @Input('availGroupGrid') availGroupGrid: HunterTableComponent;
  @ViewChild('confirmAlert') confirmAlert;
  @ViewChild('hunterTableConfig') hunterTableConfig;

  public headers: HunterTableConfig[] = TasksGroupHeaders;

  public availTaskGroups: HunterServerResponse;
  public loadingAvalGroups = true;
  public showAddGroupModal = false;
  public currFunc: string = null;
  public currDataId: number = null;
  public index: number;
  public popupModalTitle = 'Delete Task History';
  public confirmingDelete = false;
  public selGroupsToAdd: HunterTableSelItem[];

  @ViewChild('addGroupModal') addGroupModal: any;

  constructor(
      private taskService: TasksService,
      private route: ActivatedRoute,
      private router: Router,
      private alertService: AlertService,
      private logger: LoggerService,
      private overlayService: OverlayService
  ) {}

  public ngOnInit() {

  }

  public loadTask() {

  }

  public selectedItems( selItems: HunterTableSelItem[] ): void {
    this.selGroupsToAdd = selItems;
  }

  public getBarActions(): BarAction[] {
    const barAction: BarAction = BarAction.create(
      'addGroup',
      ActionTypeEnum.ADD_RECORD,
      BActionDisplayEnum.BUTTON_ICON,
      'Add Task Group',
      'glyphicon glyphicon-plus',
      'btn hunterButton'
    );
    const barActions: BarAction[] = [];
    barActions.push(barAction);
    return barActions;
  }

  public addGroupAndClose(): void {
    if ( Utility.isNotEmpty( this.selGroupsToAdd ) ) {
      this.openCloseOverlay();
      this.taskService
          .addGroupToTask( this.taskId, this.getGroupSelIds() )
          .subscribe(
            ( serverResp: ServerStatusResponse ) => {
              if ( serverResp.status + '' === 'Success' ) {
                this.addGroupModal.hide();
                this.openCloseOverlay();
                this.alertService.success( serverResp.message );
                setTimeout(() => { this.launchAddGroupWidget( false ) }, 1000);
              } else {
                this.openCloseOverlay();
                this.alertService.error( serverResp.message );
              }
            },
            ( error: any ) => {
              this.alertService.error( error.message ? error.message : 'Error occurred while adding selected groups to task.' );
              this.logger.error( JSON.stringify( error ) );
              this.openCloseOverlay();
            }
          );
    } else {
      this.addGroupModal.hide();
    }
  }

  public getGroupSelIds(): number[] {
    const selGroupIds: number[] = [];
    this.selGroupsToAdd.filter( ( selItem: HunterTableSelItem ) => {
      return selItem.selFields.find( ( sel: SelField ) => sel.header === 'groupId' && sel.selected );
    }).forEach( ( selItem: HunterTableSelItem ) => selGroupIds.push( Number(selItem.dataId) ) );
    this.logger.log( 'Selected groupd to add : ' + JSON.stringify( selGroupIds ) );
    return selGroupIds;
  }

  public cancelAddGroup(): void {
    this.addGroupModal.hide();
  }

  public onHiddenAddGroup() {
    this.logger.log( 'Hiding add group modal' );
  }

  public openCloseOverlay(): void {
    this.overlayService.openCloseOverlay( { wholeScreen: true, message: 'Loading Available Groups...' } );
  }

  public launchAddGroupWidget( launch: boolean ) {
    this.openCloseOverlay();
    this.taskService
        .getAvailTskGrpsForTskId( this.taskId )
        .subscribe(
          ( serverResp: HunterServerResponse ) => {
            this.availTaskGroups = serverResp;
            if ( this.availGroupGrid ) {
              this.availGroupGrid.refreshGrid( this.availTaskGroups );
            }
            if ( launch ) {
              setTimeout(() => { this.addGroupModal.show() }, 500);
            }
            this.openCloseOverlay();
          },
          ( error: any ) => {
            this.alertService.error( error.message ? error.message : 'Error occurred while fetching available groups.' );
            this.logger.error( 'Error occurred while fetching available groups.' + JSON.stringify( error ) );
            this.openCloseOverlay();
          }
        );
  }

  public handleBarAction( action: BarAction ): void {
    if ( action.type === ActionTypeEnum.ADD_RECORD ) {
      this.launchAddGroupWidget( true );
    }
  }

  public handleGridAction(params: any[]) {

    this.currFunc   = params[0];
    this.currDataId = params[1];
    this.index      = -1;

    this.getCurrGroupIdAndSetIndex();

    switch ( this.currFunc ) {
      case 'NewRecord' :
          this.showAddGroupModal = true;
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

  public getCurrGroupIdAndSetIndex() {
        for ( let i = 0; i < this.taskGroups.length; i++ ) {
          const groupId = this.taskGroups[i].groupId;
          if ( groupId === this.currDataId ) {
            this.currDataId = groupId;
            this.index = i;
          }
        }
  }

  public getCurrentDataId() {
    return this.currDataId;
  }

  public closeConfirmAlertModal() {
    this.confirmingDelete = false;
    this.confirmAlert.hideModal();
    this.hunterTableConfig.initializeDataGrid();
  }

  public onConfirm( params: any[] ) {

    this.logger.log( JSON.stringify(params) );

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

  public removeGroupWithId( groupId: number ) {
      let index = -1;
      for ( let i = 0; i < this.taskGroups.length; i++ ) {
        const group = this.taskGroups[i];
        this.logger.log( JSON.stringify(group) );
        if ( group.groupId === groupId ) {
          index = i;
          break;
        }
      }
      if ( index !== -1 ) {
        this.taskGroups.splice( index, 1 );
        this.taskGroups.splice(index, 1 );
        this.alertService.success('Task group successfully deleted', false);
      }
    }


}
