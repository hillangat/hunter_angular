
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TaskFieldsModel } from '../../beans/task-field-model';
import { messageTypes } from '../../beans/dropdowns-values';
import { taskTypes } from '../../beans/dropdowns-values';
import { lifeStatuses } from '../../beans/dropdowns-values';
import { utilFuncs } from '../../utilities/util-functions';

@Component({
    moduleId: module.id,
    selector: 'task-fields-edit',
    templateUrl: 'task-fields-edit.html',
    styleUrls: ['task-fields-edit.css'], 
    providers:[ FormBuilder ]
})
export class TaskFieldsEditComponent implements OnInit {
    
    @Input() task: any;
    @Output() isEditMode = new EventEmitter<boolean>();
    
    public taskFieldsForm: FormGroup; 
    public submitted:boolean = false;
    public events: any[] = [];
    public messageTypes_:string[] = messageTypes;
    public taskTypes_:string[] = taskTypes;

    constructor(private _fb: FormBuilder) { }

    /*
        Please see this link for custom validatoros:
        https://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html
    */

    validateMsgType( fc:FormControl ){
        var has = utilFuncs.constains(fc.value, messageTypes);
        return has == true ? null : {validateMsgType:false}; 
    }

    validateTaskType( fc:FormControl ){
        var has = utilFuncs.constains(fc.value, taskTypes);
        return has == true ? null : {validateTaskType:false};       
    }

    validateLifeStatus( fc:FormControl ){
        var has = utilFuncs.constains(fc.value, lifeStatuses);
        return has == true ? null : {validateLifeStatus:false};       
    }

    customValidatorMessages = {
        taskName: "Task name is requried. 5 characters minimum",
        taskType:"Task type must be one of : " + utilFuncs.arrayCSV(taskTypes),
        msgType:"Message type must be one of : " + utilFuncs.arrayCSV(messageTypes),
        taskObjective:"Task objective is required. 10 characters minimum." ,
        taskBudget: "Budget is required. Cannot be less than $100",
        desiredReceiverCount: "Desired receiver count is required. Must be more 0"
    }

    ngOnInit() {
        
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
        this.taskFieldsForm.controls['taskDateline'].setValue( this.task.taskDateline );
        this.taskFieldsForm.controls['taskDeliveryStatus'].setValue( this.task.taskDeliveryStatus );
        this.taskFieldsForm.controls['taskApproved'].setValue( this.task.taskApproved == 'Y' ?  true:false );
        this.taskFieldsForm.controls['taskApprover'].setValue( this.task.taskApprover );
        this.taskFieldsForm.controls['gateWayClient'].setValue( this.task.gateWayClient );
        this.taskFieldsForm.controls['desiredReceiverCount'].setValue( this.task.desiredReceiverCount );
        this.taskFieldsForm.controls['availableReceiverCount'].setValue( this.task.availableReceiverCount );
        this.taskFieldsForm.controls['confirmedReceiverCount'].setValue( this.task.confirmedReceiverCount );
        this.taskFieldsForm.controls['srlzdTskPrcssJbObjsFilLoc'].setValue( this.task.tasksrlzdTskPrcssJbObjsFilLocType );

    }

    setEditModeForFields(isEditMode:boolean){
        this.isEditMode.emit(isEditMode);
    }

    save(model: TaskFieldsModel, isValid: boolean) {
        this.submitted = true;         
        console.log(model, isValid);
    }

}