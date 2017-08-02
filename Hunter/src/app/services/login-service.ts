import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { User } from '../beans/User';

@Injectable()
export class LoginService{
    
    isUserLoggedIn  = false;
    loginURL:string = "localhost:8080/Hunter/restservices/client/tasks/tasks";    
    useServer:boolean = false;
       

    constructor( private http:Http ){}
    
    public login( user:User ){              
        if( this.useServer ){
            this.isUserLoggedIn = false;        
            var headers = this.getHeaders();
            let creds   = this.getCredString(user);

            return new Promise((resolve) => {
                this.http.post(this.loginURL, creds, {headers: headers}).subscribe((data) => {
                    if(data.json().success) {
                        let authKey = data.json().token;
                        window.localStorage.setItem('auth_key', authKey);   
                        this.isUserLoggedIn = true;                 
                    }
                    resolve(this.isUserLoggedIn)
                })
            })
        }else{
            this.isUserLoggedIn = true;                 
            return true;
        }
    }

    

    public getHeaders():Headers  {
        var headers = new Headers();        
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return headers;
    }

    public getCredString(user:User){
        var creds   = 'name=' + user.userName + '&password=' + user.password;
        return creds;
    }

    public isLoggedIn():boolean{
        return this.isUserLoggedIn;
    }

    public logout(){
        window.localStorage.removeItem('auth_key'); 
        this.isUserLoggedIn = false;
        return true;
    }

    

    

}