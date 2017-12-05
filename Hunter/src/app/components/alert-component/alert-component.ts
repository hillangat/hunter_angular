import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../../services/alert-service';
import { Subscription } from 'rxjs/Subscription';
import { Alert, AlertType } from '../../beans/alert';

@Component({
    moduleId: module.id,
    selector: 'app-alerts',
    templateUrl: 'alert-component.html',
    styleUrls: ['alert-component.css']

})

export class AlertComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private alerts: Alert[] = [];
    private alertLifeTime = 4500;

    constructor(private alertService: AlertService) {
        this.subscription = this.alertService.getAlert().subscribe(alert => {
            if (!alert) {
                return;
            }
            this.alerts.push(alert);
            this.setAlertLifeTime(this.alerts);
        });
    }

    setAlertLifeTime(alerts: Alert[]) {
        setTimeout(function () {
            alerts.splice( 0, 1 );
        }, this.alertLifeTime);
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    clearAll() {
        this.alerts = [];
    }

    removeAlert(index: number) {
        this.alerts.splice(index, 1);
    }

    getClassByAlertType(alert: Alert) {
        const clss1 = ' alert-dismissible ';
        let clss = null;
        switch (alert.type) {
            case AlertType.Error:
                clss = 'alert-danger';
                break;
            case AlertType.Info:
                clss = 'alert-info';
                break;
            case AlertType.Success:
                clss = 'alert-success';
                break;
            case AlertType.Warning:
                clss = 'alert-warning';
                break;
            default:
                clss = 'alert-info';
                break;
        }
        return 'alert ' + clss + clss1;
    }


}

