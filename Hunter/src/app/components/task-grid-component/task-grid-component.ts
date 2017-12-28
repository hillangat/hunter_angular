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




@Component({
  moduleId: module.id,
  selector: 'app-task-grid',
  templateUrl: './task-grid-component.html',
  styleUrls:   ['./task-grid-component.css'],
  providers: [ TasksService ]
})
export class TaskGridComponent implements OnInit {

  @ViewChild('cloneTask') cloneTaskComponent;
  @ViewChild('hunterTable') public hunterTable: HunterTableComponent;
  public tasks: HunterServerResponse;
  public loadingTasks = false;

  currFunc: string = null;
  currDataId: number = null;
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
    private logger: LoggerService
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
      this.loadAllTasks();
  }

  public loadAllTasks() {
    this.loadingTasks = true;
    this.taskService.getAllTasks().subscribe(
      ( tasks: HunterServerResponse ) => {
        this.tasks = tasks;
        this.loadingTasks = false;
      },
      (error: HunterServerResponse) => {
        this.tasks = error;
        this.alertService.error( JSON.stringify(error) );
        this.loadingTasks = false;
      }
    );
  }

  public handleBarAction( action: BarAction ) {
    alert( JSON.stringify( action ) );
  }


  public handleGridAction(params: any[]) {

      this.currFunc   = params[0];
      this.currDataId = params[1];
      this.index      = -1;

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
          this.cloneTaskComponent.showModal();
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
            this.deleteTask();
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

    public deleteTask() {
      this.logger.log( 'Deleting tasks....index = ' + this.index );
      this.tasks.data.splice( this.index, 1 );
      this.alertSuccess( 'Successfully deleted task!' );
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

