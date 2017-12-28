import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

    public log( msg: string ): void {
        console.log( msg );
    }

    public error( msg: string ): void {
        console.error( msg );
    }

    public warn( msg: string ): void {
        console.warn( msg );
    }
}
