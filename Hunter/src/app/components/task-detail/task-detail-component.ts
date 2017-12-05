
import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { ActivatedRoute } from '@angular/router';
import { taskDetailStates } from '../../beans/task-detail-states';
import { TasksHistoryHeaders } from '../../data/task-history-headers';
import { HunterTableConfig } from '../../beans/hunter-table-configs';




@Component({
    moduleId: module.id,
    templateUrl: 'task-detail-component.html',
    styleUrls: ['task-detail-component.css']
})
export class TaskDetailComponent implements OnInit {

    task: any;
    isEditMode = false;

    currFunc: string = null;
    currDataId: number;
    index: number;


    private taskId: number;
    private sub: any;
    private moneySign = '$';

    private history: any[];
    private historyHeaders: Array<HunterTableConfig> = TasksHistoryHeaders;

    constructor(private taskService: TasksService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.getTask();
        this.task = this.taskService.getTaskForTaskId(this.taskId);
        this.history = this.taskService.getTaskHistoryForTaskId(this.task.taskId);
    }

    getTask() {
        this.sub = this.route.params.subscribe(params => {
            this.taskId = +params['taskId'];
        });
        this.task = this.taskService.getTaskForTaskId(this.taskId);
    }

    getNextTaskStatus(currStatus) {
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

    isInEditMode(sectionName: string, isAnyInEditMode: boolean) {
        const sections = taskDetailStates[1]['sections'];
        for ( let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const name = section.name, mode = section.Mode;
            if (mode === 'Edit' && isAnyInEditMode) {
                return true;
            } else {
                if (sectionName === name) {
                    return mode === 'Edit';
                }
            }
        }
        return false;
    }

    setEditMode(sectionName: string, _isEditMode: boolean) {
        console.log( 'sectionname = '  + sectionName + ', _isEditMode = ' + _isEditMode );
        const sections = taskDetailStates[1]['sections'];
        for ( let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const name = section.name, mode = section.Mode;
            if (sectionName === name) {
                section.Mode = _isEditMode ? 'Edit' : 'View';
            }
        }
        this.isEditMode = this.isInEditMode( null, true );
    }

}
