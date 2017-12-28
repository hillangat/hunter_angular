
import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-task-fields-view',
    templateUrl: './task-fields-view.html',
    styleUrls: ['./task-fields-view.css']
})
export class TaskFieldsViewComponent {

    @Input() task: any;

    moneySign = '$';

    constructor() { }


}
