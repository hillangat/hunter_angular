import { AlertService } from './../../services/alert-service';
import { LoggerService } from 'app/common/logger.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-create-task',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit, OnDestroy {

    ngOnDestroy(): void {
        this.logger.log( 'On destroy method' );
    }

    constructor(
        private taskService: TasksService,
        private route: ActivatedRoute,
        private logger: LoggerService,
        private alertService: AlertService
    ) { }

    public ngOnInit() {

    }

}
