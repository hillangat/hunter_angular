import { Injectable } from '@angular/core';
import { Subject, Observable } from 'Rxjs';
import { OverlayInput } from '../beans/OverlayInput';


@Injectable()
export class OverlayService {

    private subject = new Subject<OverlayInput>();

    openCloseOverlay( overlayInput: OverlayInput ) {
        this.subject.next( overlayInput );
    }

    clearOverlay() {
        this.subject.next();
    }

    getService(): Observable<any> {
        return this.subject.asObservable();
    }
}
