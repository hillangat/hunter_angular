import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-task-message',
    templateUrl: './task-message.html',
    styleUrls: ['./task-message.css']
})

export class TasksMessageComponent implements OnInit {

    private taskId: number;
    private sub: any;
    private task: any;

    constructor( private route: ActivatedRoute, private taskService: TasksService ) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.taskId = +params['taskId'];
        });
        this.loadTask();
    }

    loadTask() {
        this.taskService.loadTaskForId(this.taskId);
    }


}
