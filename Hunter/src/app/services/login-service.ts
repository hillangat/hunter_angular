import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Response } from '@angular/http';
import { User } from '../beans/User';
import { Observable } from 'rxjs/Observable';
import { ServerResponse } from '../beans/ServerResponse';

@Injectable()
export class LoginService{
    
    loginURL:string = "http://localhost:8080/Hunter/restful/user/login";    
       
    constructor( private http:Http ){}

    public login( userName: string, password: string ): Observable<ServerResponse[]>{   
        const opts:any = { headers: this.getHeaders };      
        const creds:any = this.getCredString( userName, password );             
        return this.http
                   .post( this.loginURL, creds, opts )
                   .map( (response: Response) => response.json().data as ServerResponse[] )
                   .catch(this.handleError);
    }

    public handleError(error: any) {
        console.log( 'Error occurred >> ' + JSON.stringify(error) );
        if (error instanceof Response) {
            return Observable.throw(error.json().error || 'backend server error');
        }
        return Observable.throw(error || 'backend server error');
    }

    public getHeaders():Headers  {
        var headers = new Headers();        
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return headers;
    }

    public getCredString( userName: string, password: string ){
        var creds   = 'name=' + userName + '&password=' + password;
        return creds;
    }

    
    public logout(){
        window.localStorage.removeItem('auth_key');         
        return true;
    }

    

    

}