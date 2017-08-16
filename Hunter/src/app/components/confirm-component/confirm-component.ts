import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'confirm-alert',
    moduleId: module.id,
    templateUrl: 'confirm-component.html',
    styleUrls: ['confirm-component.css'],
    inputs: [
        'message', 
        'title', 
        'yesText', 
        'noText', 
        'yesBootstrapClass', 
        'noBootstrapClass',
        'yesButtonClass',
        'noButtonClass',
        'marker',
        'dataId'
    ],
    outputs: ['onConfirm']
})

export class ConfirmComponent implements OnInit {

    @Input('message') message: string;
    @Input('title') title: string;
    @Input('yesText') yesText: string;
    @Input('noText') noText: string;
    @Input('yesBootstrapClass') yesBootstrapClass: string;
    @Input('noBootstrapClass') noBootstrapClass: string;
    @Input('yesButtonClass') yesButtonClass: string;
    @Input('noButtonClass') noButtonClass: string;
    @Input('marker') marker:string;
    @Input('dataId') dataId:string;
    

    private yes: string = "yes";
    private no: string = "no";
    private showAlert:boolean = true;
    private configs:{ show:true };

    @Output() onConfirm = new EventEmitter<any[]>();

    ngOnInit(){
        this.showModal();
    }

    onConfirm_(type: any) {              
        this.hideModal();
        this.onConfirm.emit([type, this.marker, this.dataId]);        
    }

    getActionButtonClass(type: string) {
        if (type == 'yes')
            return this.yesButtonClass;
        else
            return this.noButtonClass;
    }

    getBoostrapIcon(type:string){
        if( type == 'yes' )
            return this.yesBootstrapClass;
        else 
            return this.noBootstrapClass;
    }

    hideModal(){             
        this.showAlert = false;
    }

    showModal(){
        this.showAlert = true;
    }

}