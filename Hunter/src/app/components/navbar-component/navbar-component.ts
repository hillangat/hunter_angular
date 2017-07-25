import { Component } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';

@Component({
  moduleId:module.id,
  selector:'navbar-component',
  templateUrl:'navbar-component.html',
  styleUrls:['navbar-component.css'],
  providers:[]
})

export class NavbarComponent{

  loggedInOutText:string = "Log Out";

  constructor( private router:Router, private loginService:LoginService ){
    this.loggedInOutText = "Log Out";
  }

  logInOrOut(){
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }

  





}
