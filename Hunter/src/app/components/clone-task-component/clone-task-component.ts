import { TaskFieldsModel } from './../../beans/task-field-model';
import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
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

    public title: 'Clone Task';
    public clients: Client[] = [];

    @Output('doneCloning') doneCloning: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input('taskId') public taskId: number;
    @Input('task') public task: TaskFieldsModel;
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
    private cloneTaskFieldsForm: FormGroup;

    constructor(
        private taskService: TasksService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private logger: LoggerService
    ) { }

    public ngOnInit() {
        this.clients = this.taskService.getClients();
        alert( JSON.stringify(this.task) );
        this.initForm();
    }

    public clone(cloneModel: TaskCloneModel, isValid: boolean) {
        this.submitted = true;
        this.taskService.cloneTask(cloneModel);
    }

    public validateClientUserName( fc: FormControl ) {
        const empty = fc.value == null || fc.value.trim() === '';
        return !empty && this.serverErrors.newClientUserName == null ? null : {validateClientUserName: false};
    }

    public initForm() {
        this.cloneTaskFieldsForm = this.formBuilder.group({
            taskId:  [this.taskId ],
            taskName: [this.task.taskName, [ <any>Validators.required, <any>Validators.minLength(5), <any>Validators.maxLength(50) ] ],
            taskDescription: [this.task.description, [ <any>Validators.required, <any>Validators.maxLength(100) ] ],
            newOwner: ['', undefined ]
        });
    }

    public cloneSelectedTask() {
        if ( this.cloneTaskFieldsForm.valid ) {
            const cloneTask: TaskCloneModel = this.cloneTaskFieldsForm.value as TaskCloneModel;
            this.taskService
                .cloneTask(cloneTask)
                .subscribe(
                    ( resp: ServerStatusResponse ) => {
                        if ( resp.status + '' === 'Success' ) {
                            this.alertService.success( resp.message );
                            this.doneCloning.emit( true );
                        } else {
                            this.alertService.error( resp.message );
                        }
                        this.hideModal();
                    },
                    ( error: any ) => {
                        this.doneCloning.emit( false );
                        this.alertService.error( 'Application error occurred' );
                    }
                );
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


