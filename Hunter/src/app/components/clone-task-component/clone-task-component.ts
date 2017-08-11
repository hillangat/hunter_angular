import { Component, Input, Output, OnInit,ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { TaskCloneModel } from '../../beans/clone-task-model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Client } from '../../beans/client';
import { utilFuncs } from '../../utilities/util-functions';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AlertService } from '../../services/alert-service';
import { Alert, AlertType } from '../../beans/alert';
import { ServerStatusResponse,ServerStatuses } from '../../beans/server-status-response';


@Component({
    selector:'clone-task',
    moduleId:module.id,
    templateUrl:'clone-task-component.html',
    styleUrls: [ 'clone-task-component.css' ],
    inputs:[ 'taskId','isModalShown' ]
})

export class CloneTaskComponent implements OnInit{

    @Input('taskId') taskId:number;
    
    private submitted:boolean = false;    
    private task:any;
    private cloneTaskFieldsForm: FormGroup; 
    private clients:Client[] = [];
    
    

    constructor( private taskService:TasksService, private formBuilder:FormBuilder, private alertService:AlertService  ){}
    
    ngOnInit(){        
        this.task = this.taskService.getNewTask();
        this.clients = this.taskService.getClients();
        console.log( JSON.stringify( this.clients ) );
        this.initForm();        
    }

    clone(cloneModel: TaskCloneModel, isValid: boolean) {
        this.submitted = true;         
        this.taskService.cloneTask(cloneModel);
    }


    customValidatorMessages = {
        newTaskName: "Task name is requried. Between 5-50 characters",
        newTaskDesc:"Task description must be 100 characters or less",
        newClientUserName:"Task client is requiried"
    }

    serverErrors = {
        newTaskId:0,
        newTaskName:null,
        newTaskDesc:null,
        newClientUserName:null
    }

    validateClientUserName( fc:FormControl ){
        let empty = fc.value == null || fc.value.trim() == '';         
        return !empty && this.serverErrors.newClientUserName == null ? null : {validateClientUserName:false};       
    }

    initForm(){        
        this.cloneTaskFieldsForm = this.formBuilder.group({
            newTaskId:  [this.taskId ],
            newTaskName: [this.task.taskName, [ <any>Validators.required, <any>Validators.minLength(5), <any>Validators.maxLength(50) ] ],
            newTaskDesc: [this.task.description, [ <any>Validators.required, <any>Validators.maxLength(100) ] ],
            newClientUserName: ['', this.validateClientUserName ]
        });
    }

    cloneSelectedTask(){
        if( this.cloneTaskFieldsForm.valid ){            
            let cloneTask:TaskCloneModel = {
                newTaskId:this.cloneTaskFieldsForm.controls['newTaskId'].value,
                newTaskName:this.cloneTaskFieldsForm.controls['newTaskName'].value,
                newTaskDesc:this.cloneTaskFieldsForm.controls['newTaskDesc'].value,
                newClientUserName:this.cloneTaskFieldsForm.controls['newClientUserName'].value
            };
            let response = this.taskService.cloneTask(cloneTask);   
            let status = response.status;
            let message = response.message;
            if( status == 'Success' ){                
                this.alertService.success( message );
                this.hideModal();
            }else{
                this.serverErrors.newClientUserName = 'Server errorr found!';
                this.alertService.error( message );
            }
        }else{
            this.alertService.warn('Please correct errors before submitting!', false);
        }        
    }

    @ViewChild('autoShownModal') 
    public autoShownModal:ModalDirective;

    @Input()
    isModalShown:boolean = true;
    
    public showModal():void {
        this.isModalShown = true;
    }
    
    public hideModal():void {
        this.autoShownModal.hide();
    }
    
    public onHidden():void {
        this.isModalShown = false;
    }
    

    
}

    

