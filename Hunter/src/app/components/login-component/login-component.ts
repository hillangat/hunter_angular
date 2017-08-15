import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { User } from '../../beans/User';
import { FirebaseService } from '../../services/firebase-service';


@Component({
    moduleId:module.id,
    selector:'login-component',
    templateUrl:'login-component.html',
    styleUrls:['login-component.css'],
    providers:[ FirebaseService ]
})

export class LoginComponent implements OnInit{

    user:User = {userName:null,password:null,firstName:null,lastName:null,key:null,roles:null};

    constructor( private router: Router, private firebaseService:FirebaseService ){}

    ngOnInit(){
        
    }

    login(){
        this.firebaseService.login();
    }
    

}