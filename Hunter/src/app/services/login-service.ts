import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Response } from '@angular/http';
import { User } from '../beans/User';
import { Observable } from 'rxjs/Observable';
import { HunterServerResponse } from '../beans/ServerResponse';
import { LoggerService } from 'app/common/logger.service';

@Injectable()
export class LoginService {

    loginURL = 'http://localhost:8080/Hunter/restful/user/login';

    constructor( private http: Http, private logger: LoggerService ) { }

    public login( userName: string, password: string ): Observable<HunterServerResponse[]> {
        const opts: any = { headers: this.getHeaders };
        const creds: any = this.getCredString( userName, password );
        return this.http
                   .post( this.loginURL, creds, opts )
                   .map( (response: Response) => response.json().data as HunterServerResponse[] )
                   .catch(this.handleError);
    }

    public handleError(error: any) {
        this.logger.error( 'Error occurred >> ' + JSON.stringify(error) );
        if (error instanceof Response) {
            return Observable.throw(error.json().error || 'backend server error');
        }
        return Observable.throw(error || 'backend server error');
    }

   public getHeaders(): Headers  {
        const headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return headers;
    }

    public getCredString( userName: string, password: string ) {
        const creds   = 'name=' + userName + '&password=' + password;
        return creds;
    }


    public logout() {
        window.localStorage.removeItem('auth_key');
        return true;
    }

}
