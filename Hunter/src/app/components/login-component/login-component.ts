import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { User } from '../../beans/User';
import { LoginService } from '../../services/login-service';


@Component({
    moduleId:module.id,
    selector:'login-component',
    templateUrl:'login-component.html',
    styleUrls:['login-component.css'],
    providers:[ LoginService ]
})

export class LoginComponent implements OnInit{

    user:User = {userName:null,password:null,firstName:null,lastName:null,key:null,roles:null};

    constructor( private router: Router, private loginService:LoginService ){}

    ngOnInit(){
        
    }

    login(){
        if( this.loginService.login(this.user) ){
            this.router.navigateByUrl("/home");
        }
    }
    

}