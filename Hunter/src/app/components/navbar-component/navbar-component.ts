import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase-service';
import { Router } from '@angular/router';

@Component({
  moduleId:module.id,
  selector:'navbar-component',
  templateUrl:'navbar-component.html',
  styleUrls:['navbar-component.css'],
  providers:[ FirebaseService ]
})

export class NavbarComponent{

  loggedInOutText:string = "Log Out";
  private userFullName:string = "";

  constructor( private router:Router, private firebaseService:FirebaseService ){
    this.loggedInOutText = "Log Out";
  }

  ngOnInit(){
    this.userFullName = this.firebaseService.getUserFullName();    
  }

  logInOrOut(){
    this.firebaseService.logout();    
  }

  





}
