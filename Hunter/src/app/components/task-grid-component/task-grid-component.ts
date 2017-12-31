import { OverlayService } from 'app/services/overlay-service';
import { ServerStatusResponse } from './../../beans/server-status-response';
import { TaskFieldsEditComponent } from './../task-fields/task-fields-edit';
import { HunterServerResponse } from './../../beans/ServerResponse';
import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HunterTableConfig } from '../../beans/hunter-table-configs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert-service';
import { Alert, AlertType } from '../../beans/alert';
import { LoggerService } from '../../common/logger.service';
import HunterTableUtil from 'app/components/hunter-table-component/shared/HunterTableUtil';
import BarAction from '../hunter-table-component/shared/BarAction';
import { HunterTableComponent } from 'app/components/hunter-table-component/hunter-table';
import { ActionTypeEnum } from 'app/components/hunter-table-component/shared/ActionTypeEnum';




@Component({
  moduleId: module.id,
  selector: 'app-task-grid',
  templateUrl: './task-grid-component.html',
  styleUrls:   ['./task-grid-component.css'],
  providers: [ TasksService ]
})
export class TaskGridComponent implements OnInit {

  @ViewChild('taskFieldsEdit') taskFieldsEdit: TaskFieldsEditComponent;
  @ViewChild('cloneTaskComponent') cloneTaskComponent;
  @ViewChild('hunterTable') public hunterTable: HunterTableComponent;
  public tasks: HunterServerResponse;
  public loadingTasks = false;

  currFunc: string = null;
  currDataId: number = null;
  currSelRow: any = null;
  index: number;
  popupModalTitle = 'Delete Task History';
  cloneTitle = 'Clone Selected Task';
  @ViewChild('autoShownModal')
  public autoShownModal: ModalDirective;
  public isModalShown = false;

  modalAction: string = null;
  selActionDispName: string = null;

  isCloningTask = false;

  constructor(
    private taskService: TasksService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private logger: LoggerService,
    private overlayService: OverlayService
  ) {}

  alertError( message: string ) {
    this.alertService.error( message, false );
  }

  alertWarning( message: string ) {
    this.alertService.warn( message, false );
  }

  alertSuccess( message: string ) {
    this.alertService.success( message, false );
  }

  alertInfo( message: string ) {
    this.alertService.info( message, false );
  }

  ngOnInit() {
      this.loadAllTasks( false );
  }

  public reloadData() {
    this.loadAllTasks( true );
  }

  public loadAllTasks( initGrid: boolean ) {
    this.loadingTasks = true;
    this.openCloseOverlay();
    this.taskService.getAllTasks().subscribe(
      ( tasks: HunterServerResponse ) => {
        this.tasks = tasks;
        this.loadingTasks = false;
        if ( initGrid && this.hunterTable ) {
          this.hunterTable.initializeDataGrid();
        }
        this.openCloseOverlay();
      },
      (error: HunterServerResponse) => {
        this.tasks = error;
        this.alertService.error( JSON.stringify(error) );
        this.loadingTasks = false;
        this.openCloseOverlay();
      }
    );
  }

  public openCloseOverlay(): void {
    this.overlayService.openCloseOverlay( { wholeScreen: true, message: 'Loading Tasks...' } );
  }

  public handleBarAction( action: BarAction ) {
    if ( action.type === ActionTypeEnum.CREATE ) {
      this.taskFieldsEdit.open( true, undefined );
    }
  }

  public doneCloning( success: boolean ) {
    this.loadAllTasks( true );
  }


  public handleGridAction(params: any[]) {

      this.currFunc   = params[0];
      this.currDataId = params[1];
      this.index      = -1;
      this.currSelRow = params[2];

      // this.getCurrTaskIdAndSetIndex();

      switch ( this.currFunc ) {
        case 'delete' :
          this.modalAction = 'DeleteTask';
          this.selActionDispName = 'Delete';
          this.showModal();
          break;
        case 'edit' :
          this.logger.log( 'Editing task not allowed here. Doing nothing' );
          this.selActionDispName = 'Edit';
          break;
        case 'process' :
          this.modalAction = 'ProcessTask'
          this.selActionDispName = 'Process';
          this.showModal();
          break;
        case 'open' :
          this.router.navigateByUrl('taskdetails/' + this.currDataId);
          this.selActionDispName = 'Open';
          break;
        case 'clone' :
          this.modalAction = 'CloneTask'
          if ( this.cloneTaskComponent ) {
            this.cloneTaskComponent.showModal();
          }
          break;
      }

  }

  public getBarActions(): BarAction[] {
    return HunterTableUtil.getBarActions();
  }

  public performSelAction() {
        this.hideModal();
        switch ( this.modalAction ) {
          case 'DeleteTask' :
            this.deleteTask( this.currDataId );
            break;
          case 'EditTask' :
            this.logger.log( 'Editing task not allowed here. Doing nothing' );
            break;
          case 'ProcessTask' :
            this.processTask();
            break;
          case 'CloneTask' :
            this.cloneTask();
            break;
      }
    }

    public deleteTask( taskId: number ) {
      this.taskService.deleteTask( taskId ).subscribe(
        ( status: ServerStatusResponse ) => {
          if ( status.status.toString() === 'Success' ) {
            this.alertService.success( status.message );
            this.loadAllTasks( true );
          } else {
            this.alertService.error( status.message );
          }
        },
        (error: ServerStatusResponse) => {
          this.alertService.error( 'Error: ' + error.message );
        }
      );
    }

    public processTask() {
      this.alertError( 'This action is not currently supported!' );
    }

    public cloneTask() {
      this.alertError( 'This action is not currently supported!' );
    }

    public getActionIcon() {
      this.logger.log( 'getting action icon for action = ' + this.currFunc );
      const icon = 'glyphicon glyphicon-';
      switch ( this.modalAction ) {
        case 'CloneTask': return icon + 'book';
        case 'ProcessTask' : return icon + 'play';
        case 'EditTask' : return icon + 'pencil';
        case 'DeleteTask' : return icon + 'remove';
        default:
          this.logger.log( 'No action found!!' );
        break;
      }
    }

    getActionButtonClass() {
      const class_ = 'btn btn-';
      return this.modalAction === 'DeleteTask' ? class_ + 'danger' : class_ + 'success';
    }

    public showModal(): void {
        this.isModalShown = true;
    }

    public hideModal(): void {
        this.autoShownModal.hide();
    }

    public onHidden(): void {
        this.isModalShown = false;
    }
}

