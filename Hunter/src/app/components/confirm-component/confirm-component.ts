import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-confirm-alert',
    moduleId: module.id,
    templateUrl: './confirm-component.html',
    styleUrls: ['./confirm-component.css']
})

export class ConfirmComponent implements OnInit {

    @Input('titleIconClass') titleIconClass: string;
    @Input('preTexIconClass') preTexIconClass: string;
    @Input('textColor') textColor: string;
    @Input('message') message: string;
    @Input('title') title: string;
    @Input('yesText') yesText: string;
    @Input('noText') noText: string;
    @Input('yesBootstrapClass') yesBootstrapClass: string;
    @Input('noBootstrapClass') noBootstrapClass: string;
    @Input('yesButtonClass') yesButtonClass: string;
    @Input('noButtonClass') noButtonClass: string;
    @Input('marker') marker: string;
    @Input('dataId') dataId: string;

    private yes = 'yes';
    private no = 'no';
    private showAlert = false;
    private configs: { show: true };

    @Output() onConfirm = new EventEmitter<any[]>();

    public ngOnInit() {}

    public onConfirm_(type: any) {
        this.hideModal();
        this.onConfirm.emit([type, this.marker, this.dataId]);
    }

    public getActionButtonClass(type: string) {
        if ( type === 'yes' ) {
            return this.yesButtonClass;
        } else {
            return this.noButtonClass;
        }
    }

    public getBoostrapIcon( type: string ) {
        if ( type === 'yes' ) {
            return this.yesBootstrapClass;
        } else {
            return this.noBootstrapClass;
        }
    }

    public hideModal() {
        this.showAlert = false;
    }

    public showModal() {
        this.showAlert = true;
    }

}
