import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    moduleId:module.id,
    selector: 'task-clone',
    templateUrl:'task-clone-component.html',
    styleUrls: [ 'task-clone-component.css' ]
})

export class TaskCloneComponent implements OnInit {

    title:string = "Clone Selected Task";
    
    constructor(){}
    ngOnInit(){}

    cloneSelectedTask(){
        this.hideModal();
        alert( 'Cloning...' );
    }

    
    @ViewChild('autoShownModal') 
    public autoShownModal:ModalDirective;

    @Input()
    public isModalShown:boolean = true;
    
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