import { BActionDisplayEnum } from './../hunter-table-component/shared/BActionDisplayEnum';
import { ActionTypeEnum } from './../hunter-table-component/shared/ActionTypeEnum';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { taskHistory } from '../../data/mocked-task-history';
import { HunterTableConfig } from '../../beans/hunter-table-configs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AlertService } from '../../services/alert-service';
import { Alert, AlertType } from '../../beans/alert';
import { WorkflowTreeService } from '../../services/workflow-tree-service';
import { WorkflowStep } from '../../beans/workflow-tree';
import { HunterServerResponse } from '../../beans/ServerResponse';
import { LoggerService } from '../../common/logger.service';
import BarAction from 'app/components/hunter-table-component/shared/BarAction';
import HunterTableUtil from '../hunter-table-component/shared/HunterTableUtil';

@Component({
    moduleId: module.id,
    selector: 'app-home-component',
    templateUrl: './home.html',
    styleUrls: ['./home.css'],
    providers: [ WorkflowTreeService ]
})
export class HomeComponent {

  currFunc: string = null;
  currDataId: number = null;
  index: number;
  popupModalTitle = 'Delete Task History';
  @ViewChild('autoShownModal')
  public autoShownModal: ModalDirective;
  public isModalShown = false;
  private worflowSteps: WorkflowStep[];
  public items: string[] = ['The first choice!', 'And another choice for you.', 'but wait! A third!' ];
  private loadingTrees = false;
  private errorOccurred = false;
  private selStep: WorkflowStep;

  @ViewChild('closePopupButton') closePopupButton: ElementRef;

  headers: Array<HunterTableConfig> = [
    {
      'index': 0,
      'headerId': 'historyId',
      'dataId': 'historyId',
      'displayName': 'ID',
      'sortable': true,
      'show': true,
      'bootstrapIconName': null,
      'dataType': 'number',
      'currentOrder': false,
      'actionCol': false,
      'actionColIconName': null,
      'width': '80px'
    },
    {
      'index': 1,
      'headerId': 'evenName',
      'dataId': 'historyId',
      'displayName': 'Event Name',
      'sortable': true,
      'show': true,
      'bootstrapIconName': 'search',
      'dataType': 'string',
      'currentOrder': false,
      'actionCol': false,
      'actionColIconName': null,
      'width': null
    },
    {
      'index': 2,
      'headerId': 'eventMessage',
      'dataId': 'historyId',
      'displayName': 'Event Message',
      'sortable': true,
      'show': true,
      'bootstrapIconName': 'remove',
      'dataType': 'string',
      'currentOrder': false,
      'actionCol': false,
      'actionColIconName': null,
      'width': null
    },
    {
      'index': 3,
      'headerId': 'eventDate',
      'dataId': 'historyId',
      'displayName': 'Event Date',
      'sortable': true,
      'show': true,
      'bootstrapIconName': 'calendar',
      'dataType': 'string',
      'currentOrder': false,
      'actionCol': false,
      'actionColIconName': null,
      'width': null
    },
    {
      'index': 4,
      'headerId': 'eventUser',
      'dataId': 'historyId',
      'displayName': 'Event User',
      'sortable': true,
      'show': true,
      'bootstrapIconName': 'user',
      'dataType': 'string',
      'currentOrder': false,
      'actionCol': false,
      'actionColIconName': null,
      'width': null
    },
    {
      'index': 5,
      'headerId': 'eventStatus',
      'dataId': 'historyId',
      'displayName': 'Status',
      'sortable': true,
      'show': true,
      'bootstrapIconName': 'clock',
      'dataType': 'string',
      'currentOrder': true,
      'actionCol': false,
      'actionColIconName': null,
      'width': null
    },
    {
      'index': 5,
      'headerId': 'edit',
      'dataId': 'historyId',
      'displayName': 'Edit',
      'sortable': false,
      'show': false,
      'bootstrapIconName': 'edit',
      'dataType': 'string',
      'currentOrder': false,
      'actionCol': true,
      'actionColIconName': 'pencil',
      'width': null
    },
    {
      'index': 5,
      'headerId': 'delete',
      'dataId': 'historyId',
      'displayName': 'Delete',
      'sortable': false,
      'show': false,
      'bootstrapIconName': 'remove',
      'dataType': 'string',
      'currentOrder': false,
      'actionCol': true,
      'actionColIconName': 'remove',
      'width': null
    }
  ];

  hunterTableData = [
    {
      'taskId': 4,
      'evenName': 'Change Status',
      'eventMessage': 'Failed to clone task.Client already has a task with this task name.',
      'historyId': 56,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Failed'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Successfully cloned task. New task ( 11 ) for new user ( admin )',
      'historyId': 79,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Success'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Successfully cloned task. New task ( 10 ) for new user ( admin )',
      'historyId': 78,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Success'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Failed to clone task.Client already has a task with this task name.',
      'historyId': 77,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Failed'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Successfully cloned task. New task ( 9 ) for new user ( admin )',
      'historyId': 76,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Success'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Failed to clone task.Client already has a task with this task name.',
      'historyId': 75,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Failed'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Successfully cloned task. New task ( 8 ) for new user ( admin )',
      'historyId': 74,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Success'
    },
    {
      'taskId': 4,
      'evenName': 'Process',
      'eventMessage': 'Successfully processed task!',
      'historyId': 58,
      'eventDate': '2017-05-26 21:26',
      'eventUser': 'admin',
      'eventStatus': 'Success'
    },
    {
      'taskId': 4,
      'evenName': 'Change Status',
      'eventMessage': 'Failed to clone task.Client already has a task with this task name.',
      'historyId': 59,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Failed'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Successfully cloned task. New task ( 11 ) for new user ( admin )',
      'historyId': 60,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Success'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Successfully cloned task. New task ( 10 ) for new user ( admin )',
      'historyId': 61,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Success'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Failed to clone task.Client already has a task with this task name.',
      'historyId': 62,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Failed'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Successfully cloned task. New task ( 9 ) for new user ( admin )',
      'historyId': 63,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Success'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Failed to clone task.Client already has a task with this task name.',
      'historyId': 64,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Failed'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Successfully cloned task. New task ( 8 ) for new user ( admin )',
      'historyId': 65,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Success'
    },
    {
      'taskId': 4,
      'evenName': 'Process',
      'eventMessage': 'Successfully processed task!',
      'historyId': 66,
      'eventDate': '2017-05-26 21:26',
      'eventUser': 'admin',
      'eventStatus': 'Success'
    },
    {
      'taskId': 4,
      'evenName': 'Change Status',
      'eventMessage': 'Failed to clone task.Client already has a task with this task name.',
      'historyId': 67,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Failed'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Successfully cloned task. New task ( 11 ) for new user ( admin )',
      'historyId': 68,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Success'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Successfully cloned task. New task ( 10 ) for new user ( admin )',
      'historyId': 69,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Success'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Failed to clone task.Client already has a task with this task name.',
      'historyId': 70,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Failed'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Successfully cloned task. New task ( 9 ) for new user ( admin )',
      'historyId': 71,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Success'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Failed to clone task.Client already has a task with this task name.',
      'historyId': 72,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Failed'
    },
    {
      'taskId': 4,
      'evenName': 'Clone',
      'eventMessage': 'Successfully cloned task. New task ( 8 ) for new user ( admin )',
      'historyId': 73,
      'eventDate': '2017-05-27 17:55',
      'eventUser': 'mathash',
      'eventStatus': 'Success'
    },
    {
      'taskId': 4,
      'evenName': 'Process',
      'eventMessage': 'Successfully processed task!',
      'historyId': 74,
      'eventDate': '2017-05-26 21:26',
      'eventUser': 'admin',
      'eventStatus': 'Success'
    }
  ];


  constructor(
    private alertService: AlertService,
    private workflowTreeService: WorkflowTreeService,
    private logger: LoggerService
  ) {}

  public handleBarAction( action: BarAction ) {
    this.popupModalTitle = action.text;
    if ( action.type === ActionTypeEnum.CREATE  ) {
      this.showModal();
    }
  }

    handleGridAction(params: any[]) {

      this.currFunc   = params[0];
      this.currDataId = params[1];
      this.index      = -1;

      if ( this.currFunc === 'delete' ) {
        for ( let i = 0; i < this.hunterTableData.length; i++ ) {
          const historyId = this.hunterTableData[i].historyId;
          if ( historyId === this.currDataId ) {
            this.currDataId = historyId;
            this.index = i;
          }
        }
        if ( this.index !== -1 ) {
          this.showModal();
        } else {
          this.logger.error( 'No index to be deleted found!! Bad data! funcName = ' + this.currFunc + ', dataId = ' + this.currDataId );
        }
      } else if ( this.currFunc === 'edit' ) {
        alert('Opening edit....');
      }
    }

    deleteSelectedRow() {
      this.hunterTableData.splice( this.index, 1 );
      this.hideModal();
      this.alertService.success( 'Successfully closed the modal', false );
    }

    getCurrentDataId() {
      return 999;
    }

    onConfirm(params: string[]) {
      const type = params[0];
      const marker = params[1];
      const dataId = params[2];
      // alert( 'marker = ' + marker + ', ' + 'dataId = ' + dataId + ', type = ' + type );
      // this.onConfirm.emit([type, this.marker, this.dataId]);
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


  public loadWorkflowTrees() {
    this.loadingTrees  = true;
    this.worflowSteps  = null;
    this.errorOccurred = false;
    this.workflowTreeService.getWorkflowTrees().then(
      ( serverResp: HunterServerResponse ) => {
        if ( serverResp.status === 'Success' ) {
          this.worflowSteps  = serverResp.data as WorkflowStep[];
          this.errorOccurred = false;
        } else {
          this.errorOccurred = false;
          this.alertService.error('Error: ' + serverResp.message, false);
        }
        this.loadingTrees  = false;
      },
      error => {
        this.alertService.error('Error: ' + error.status + ':' + error.statusText, false);
        this.loadingTrees  = false;
        this.errorOccurred = true;
      }
    );
  }

  public showStepDetails( step: WorkflowStep ) {
    this.selStep = step;
    this.popupModalTitle = 'Workflow Tree Step Details';
    this.showModal();
  }


  private handleError(error: any): Promise<any> {
    this.logger.error( 'An error occurred' + JSON.stringify(error) ); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  public filterAndClosePopup() {
    this.closePopupButton.nativeElement.click();
    this.alertService.success( 'Successfully filtered', false );
  }

  public onFilterDropdownHidden(): void {
    this.logger.log('Dropdown is hidden');
  }
  public onShown(): void {
    this.logger.log('Dropdown is shown');
  }
  public isOpenChange(): void {
    this.logger.log('Dropdown state is changed');
  }

  public getBarActions(): BarAction[] {
    return HunterTableUtil.getBarActions();
  }


  clickedOutside() {
    alert( 'User clicked outside!!!!!!!!!!' );
  }

}
