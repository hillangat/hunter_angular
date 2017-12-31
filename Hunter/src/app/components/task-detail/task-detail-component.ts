import { Observable } from 'Rxjs';
import { AlertService } from './../../services/alert-service';
import { HunterServerResponse } from './../../beans/ServerResponse';
import { Task } from './../../beans/Task';

import { Component, OnInit, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { taskDetailStates } from '../../beans/task-detail-states';
import { TasksHistoryHeaders } from '../../data/task-history-headers';
import { HunterTableConfig } from '../../beans/hunter-table-configs';
import { LoggerService } from 'app/common/logger.service';
import Utility from 'app/utilities/Utility';
import { OverlayService } from '../../services/overlay-service';
import { HunterTableComponent } from 'app/components/hunter-table-component/hunter-table';




@Component({
    moduleId: module.id,
    templateUrl: './task-detail-component.html',
    styleUrls: ['./task-detail-component.css']
})
export class TaskDetailComponent implements OnInit {

    public task: Task;
    public isEditMode = false;

    public currFunc: string = null;
    public currDataId: number;
    public index: number;


    private taskId: number;
    private sub: any;
    private moneySign = '$';

    private history: HunterServerResponse = undefined;
    private historyHeaders: Array<HunterTableConfig> = TasksHistoryHeaders;

    @ViewChild( 'historyGrid' ) private historyGrid: HunterTableComponent;

    constructor(
        private taskService: TasksService,
        private route: ActivatedRoute,
        private router: Router,
        private logger: LoggerService,
        private alertService: AlertService,
        private overlayService: OverlayService
    ) { }

    public ngOnInit() {
        this.sub = this.route.params.subscribe( ( params: Params ) => {
            this.taskId = +params['taskId'];
            this.loadTaskDetails();
        });
    }

    public openCloseOverlay(): void {
        this.overlayService.openCloseOverlay( { wholeScreen: true, message: 'Loading Task Details...' } );
    }

    public loadTaskDetails() {
        this.openCloseOverlay();
        Observable.forkJoin(
            this.taskService.loadTaskForId( this.taskId ),
            this.taskService.getTaskHistoryForTaskId( this.taskId ),
            this.taskService.furnishTask( this.taskId )
        ).subscribe(
            ( data: any[] ) => {

                this.openCloseOverlay();

                // set task bean
                const taskResp: HunterServerResponse = data[0];
                const task: Task = Utility.isNotEmpty(taskResp.data) ? taskResp.data[0] : null;
                if ( !task ) {
                    this.alertService.error( 'No such task found!' );
                    this.router.navigateByUrl( '/tasks' );
                } else {

                    // Set task history
                    const taskHistory: HunterServerResponse = data[1];
                    this.history = taskHistory;
                    if ( this.historyGrid ) {
                        this.historyGrid.refreshGrid( this.history );
                    }

                    // Furnish the task
                    const furnishResp: HunterServerResponse = data[2];
                    task.createdByStr = furnishResp.data['createdByStr'];
                    task.updatedByStr = furnishResp.data['updatedByStr'];
                    task.processedByStr = furnishResp.data['processedByStr'];

                    this.task = task;
                }
            },
            ( error: any ) => {
                this.logger.error( JSON.stringify( error ) );
                this.openCloseOverlay();
            }
        );
    }

    public getNextTaskStatus(currStatus) {
        let nextStatus: string = null;
        switch (currStatus) {
            case 'Draft': nextStatus = 'Review';
                break;
            case 'Review': nextStatus = 'Approved';
                break;
            case 'Review': nextStatus = 'Review';
                break;
            default:
                break;
        }
        return nextStatus;
    }

    public isInEditMode( params: { sectionName: string, isAnyInEditMode: boolean } ) {
        const sections = taskDetailStates[1]['sections'];
        for ( let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const name = section.name, mode = section.Mode;
            if (mode === 'Edit' && params.isAnyInEditMode) {
                return true;
            } else {
                if (params.sectionName === name) {
                    return mode === 'Edit';
                }
            }
        }
        return false;
    }

    public setEditMode( params: { sectionName: string, _isEditMode: boolean } ) {
        this.logger.log( 'sectionname = '  + params.sectionName + ', _isEditMode = ' + params._isEditMode );
        const sections = taskDetailStates[1]['sections'];
        for ( let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const name = section.name, mode = section.Mode;
            if ( params.sectionName === name ) {
                section.Mode = params._isEditMode ? 'Edit' : 'View';
            }
        }
        this.isEditMode = this.isInEditMode( { sectionName: params.sectionName, isAnyInEditMode: params._isEditMode } );
    }

    public formatDateNumber( dateNum: number ): string {
        return Utility.getFormatedFromNumber( dateNum );
    }

}
