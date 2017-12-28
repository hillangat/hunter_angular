import { Component, Input, Output, OnInit, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { TaskCloneModel } from '../../beans/clone-task-model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Client } from '../../beans/client';
import { utilFuncs } from '../../utilities/util-functions';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AlertService } from '../../services/alert-service';
import { Alert, AlertType } from '../../beans/alert';
import { ServerStatusResponse, ServerStatuses } from '../../beans/server-status-response';
import { LoggerService } from '../../common/logger.service';


@Component({
    selector: 'app-clone-task',
    moduleId: module.id,
    templateUrl: './clone-task-component.html',
    styleUrls: [ './clone-task-component.css' ]
})

export class CloneTaskComponent implements OnInit {

    @Input('taskId') public taskId: number;
    @ViewChild('autoShownModal')  public autoShownModal: ModalDirective;
    @Input() isModalShown = true;

    customValidatorMessages = {
        newTaskName: 'Task name is requried. Between 5-50 characters',
        newTaskDesc: 'Task description must be 100 characters or less',
        newClientUserName: 'Task client is required'
    }

    serverErrors = {
        newTaskId: 0,
        newTaskName: null,
        newTaskDesc: null,
        newClientUserName: null
    }

    private submitted = false;
    private task: any;
    private cloneTaskFieldsForm: FormGroup;
    private clients: Client[] = [];

    constructor(
        private taskService: TasksService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private logger: LoggerService
    ) { }

    ngOnInit() {
        this.task = this.taskService.getNewTask();
        this.clients = this.taskService.getClients();
        this.logger.log( JSON.stringify( this.clients ) );
        this.initForm();
    }

    clone(cloneModel: TaskCloneModel, isValid: boolean) {
        this.submitted = true;
        this.taskService.cloneTask(cloneModel);
    }

    validateClientUserName( fc: FormControl ) {
        const empty = fc.value == null || fc.value.trim() === '';
        return !empty && this.serverErrors.newClientUserName == null ? null : {validateClientUserName: false};
    }

    initForm() {
        this.cloneTaskFieldsForm = this.formBuilder.group({
            newTaskId:  [this.taskId ],
            newTaskName: [this.task.taskName, [ <any>Validators.required, <any>Validators.minLength(5), <any>Validators.maxLength(50) ] ],
            newTaskDesc: [this.task.description, [ <any>Validators.required, <any>Validators.maxLength(100) ] ],
            newClientUserName: ['', undefined ]
        });
    }

    cloneSelectedTask() {
        if ( this.cloneTaskFieldsForm.valid ) {
            const cloneTask: TaskCloneModel = {
                newTaskId: this.cloneTaskFieldsForm.controls['newTaskId'].value,
                newTaskName: this.cloneTaskFieldsForm.controls['newTaskName'].value,
                newTaskDesc: this.cloneTaskFieldsForm.controls['newTaskDesc'].value,
                newClientUserName: this.cloneTaskFieldsForm.controls['newClientUserName'].value
            };
            const response = this.taskService.cloneTask(cloneTask);
            const status = response.status;
            const message = response.message;
            if ( status === 'Success' ) {
                this.alertService.success( message );
                this.hideModal();
            } else {
                this.serverErrors.newClientUserName = 'Server errorr found!';
                this.alertService.error( message );
            }
        } else {
            this.alertService.warn('Please correct errors before submitting!', false);
        }
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


