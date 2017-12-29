import { ServerStatusResponse } from './../../beans/server-status-response';
import { AlertService } from './../../services/alert-service';

import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TaskFieldsModel } from '../../beans/task-field-model';
import { messageTypes } from '../../beans/dropdowns-values';
import { taskTypes } from '../../beans/dropdowns-values';
import { lifeStatuses } from '../../beans/dropdowns-values';
import { utilFuncs } from '../../utilities/util-functions';
import { LoggerService } from 'app/common/logger.service';
import { ConfirmComponent } from 'app/components/confirm-component/confirm-component';
import { AbstractControl } from '@angular/forms/src/model';
import { TasksService } from '../../services/tasks-service';
import { Task } from '../../beans/Task';
import Utility from '../../utilities/Utility';

@Component({
    moduleId: module.id,
    selector: 'app-task-fields-edit',
    templateUrl: './task-fields-edit.html',
    styleUrls: ['./task-fields-edit.css'],
    providers: [ FormBuilder ]
})
export class TaskFieldsEditComponent implements OnInit {

    @ViewChild('lgModal') lgModal: any;
    @ViewChild('confirmAlert') confirmAlert: ConfirmComponent;
    @Output() setEditMode = new EventEmitter<{ sectionName: string, _isEditMode: boolean }>();

    public taskFieldsForm: FormGroup;
    public submitted = false;
    public events: any[] = [];
    public messageTypes_: string[] = messageTypes;
    public taskTypes_: string[] = taskTypes;
    public isNew = false;
    public task: Task;

    public customValidatorMessages = {
        taskName: 'Task name is requried. 5 characters minimum',
        taskType: 'Task type must be one of : ' + utilFuncs.arrayCSV(taskTypes),
        msgType: 'Message type must be one of : ' + utilFuncs.arrayCSV(messageTypes),
        taskObjective: 'Task objective is required. 10 characters minimum.' ,
        taskBudget: 'Budget is required. Cannot be less than $100',
        desiredReceiverCount: 'Desired receiver count is required. Must be more 0',
        clientId: 'Task client is required'
    };


    constructor(
        private _fb: FormBuilder,
        private logger: LoggerService,
        private alertService: AlertService,
        private taskService: TasksService
    ) { }

    /*
        Please see this link for custom validatoros:
        https://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html
    */

    public open( isNew: boolean, task: any ) {
        this.isNew = isNew;
        this.task = task;
        this.setValues();
        this.lgModal.show();
    }

    public _setEditMode( params: { sectionName: string, _isEditMode: boolean } ) {
        this.logger.log( JSON.stringify( params ) );
        this.setEditMode.emit( params );
    }

    public validateMsgType( fc: FormControl ) {
        const has = utilFuncs.constains(fc.value, messageTypes);
        return has === true ? null : { validateMsgType: false };
    }

    public validateTaskType( fc: FormControl ) {
        const has = utilFuncs.constains(fc.value, taskTypes);
        return has === true ? null : { validateTaskType: false };
    }

    public validateLifeStatus( fc: FormControl ) {
        const has = utilFuncs.constains(fc.value, lifeStatuses);
        return has === true ? null : { validateLifeStatus: false };
    }

    public ngOnInit() {
        this.createForm();
    }

    public createForm() {
        this.taskFieldsForm = this._fb.group({
            taskType:  ['', this.validateTaskType ],
            taskName: ['', [ <any>Validators.required, <any>Validators.minLength(10) ] ],
            taskObjective: ['', [ <any>Validators.required, <any>Validators.minLength(10) ] ],
            description:  '',
            tskAgrmntLoc: '',
            tskMsgType:  ['',  this.validateMsgType ],
            taskBudget: [100, [ <any>Validators.required, <any>Validators.min(100) ] ],
            taskCost:   100,
            recurrentTask: false,
            taskDateline: new Date(),
            taskLifeStatus: '',
            taskDeliveryStatus: '',
            taskApproved: false,
            taskApprover: '',
            gateWayClient: 0,
            desiredReceiverCount: [1, [ <any>Validators.required, <any>Validators.min(1) ] ],
            availableReceiverCount: 0,
            confirmedReceiverCount: 0,
            srlzdTskPrcssJbObjsFilLoc: 0
        });
        this.hasClientId();
    }

    public hasClientId(): boolean  {
        if ( this.isNew ) {
            const formConstrol: AbstractControl = new FormControl( undefined, Validators.required ) as AbstractControl;
            this.taskFieldsForm.addControl( 'clientId', formConstrol );
            return true;
        }
        return false;
    }

    public setValues() {
        if ( !this.isNew && this.task ) {
            this.taskFieldsForm.controls['taskLifeStatus'].setValue( this.task.taskLifeStatus );
            this.taskFieldsForm.controls['taskName'].setValue( this.task.taskName );
            this.taskFieldsForm.controls['taskType'].setValue( this.task.taskType );
            this.taskFieldsForm.controls['taskObjective'].setValue( this.task.taskObjective );
            this.taskFieldsForm.controls['description'].setValue( this.task.description );
            this.taskFieldsForm.controls['tskAgrmntLoc'].setValue( this.task.tskAgrmntLoc );
            this.taskFieldsForm.controls['tskMsgType'].setValue( this.task.tskMsgType );
            this.taskFieldsForm.controls['taskBudget'].setValue( this.task.taskBudget );
            this.taskFieldsForm.controls['taskCost'].setValue( this.task.taskCost );
            this.taskFieldsForm.controls['recurrentTask'].setValue( this.task.recurrentTask );
            this.taskFieldsForm.controls['taskDeliveryStatus'].setValue( this.task.taskDeliveryStatus );
            this.taskFieldsForm.controls['taskApproved'].setValue( this.task.taskApproved ?  true : false );
            this.taskFieldsForm.controls['taskApprover'].setValue( this.task.taskApprover );
            this.taskFieldsForm.controls['gateWayClient'].setValue( this.task.gateWayClient );
            this.taskFieldsForm.controls['desiredReceiverCount'].setValue( this.task.desiredReceiverCount );
            this.taskFieldsForm.controls['availableReceiverCount'].setValue( this.task.availableReceiverCount );
            this.taskFieldsForm.controls['confirmedReceiverCount'].setValue( this.task.confirmedReceiverCount );
            this.taskFieldsForm.controls['srlzdTskPrcssJbObjsFilLoc'].setValue( this.task.tasksrlzdTskPrcssJbObjsFilLocType );
            this.setDate( 'taskDateline' );
        }
    }

    public cancelAndClose() {
        if ( this.taskFieldsForm.dirty ) {
            this.confirmAlert.showModal();
        } else {
            this.lgModal.hide();
        }
    }

    public saveAndClose( saveModel: TaskFieldsModel, valid: boolean ) {
        if ( !this.taskFieldsForm.valid ) {
            this.alertService.error( 'Please fix error and try again.', false );
        } else {
            if ( this.isNew ) {
                saveModel.taskId    = 0;
                saveModel.taskDateline = Utility.getFormatedDate( saveModel.taskDateline as Date );
                this.taskService.createOrUpdateTask( saveModel ).subscribe(
                    ( resp: ServerStatusResponse ) => {
                        this.alertService.success( resp.message );
                        this.submitted = true;
                        this.lgModal.hide();
                    },
                    ( error: any ) => {
                        this.alertService.error( 'Could not save changes. An error occurred!' );
                    }
                );
            } else {

                saveModel.clientId = this.task.clientId
                saveModel.taskId = this.task.taskId;
                saveModel.taskDateline = Utility.getFormatedDate( saveModel.taskDateline as Date );

                this.taskService.createOrUpdateTask( saveModel ).subscribe(
                    ( resp: ServerStatusResponse ) => {
                        this.alertService.success( resp.message );
                        this.submitted = true;
                        this.lgModal.hide();
                    },
                    ( error: any ) => {
                        this.submitted = true;
                        this.lgModal.hide();
                        saveModel.taskId = ( this.task as Task ).taskId;
                        this.alertService.error( 'Could not save changes. An error occurred!' );
                    }
                );

            }
        }
    }

    public onConfirm(params: string[]) {
        const type = params[0];
        const marker = params[1];
        const dataId = params[2];

        if ( type === 'yes' ) {
            this.alertService.success( 'Changes successfully discarded', false );
            this.lgModal.hide();
        } else {
            this.confirmAlert.hideModal();
        }
        // alert( 'marker = ' + marker + ', ' + 'dataId = ' + dataId + ', type = ' + type );
        // this.onConfirm.emit([type, this.marker, this.dataId]);
      }

    /** Re-initialize the form on closing the window */
    public onHidden() {
        this.createForm();
    }

    public setDate( key: string ) {
        const formControl: AbstractControl = this.taskFieldsForm.controls[key];
        const dateVal: any = ( this.isNew || !this.task || !this.task[key] ) ? new Date() : new Date( this.task[key] + '' );
        formControl.setValue( dateVal );
    }


}
