import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './services/login-service';
import { TasksService } from './services/tasks-service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ LoginService, TasksService ]  
})
export class AppComponent implements OnInit, OnDestroy {

  

  constructor( private loginService:LoginService, private taskService:TasksService ){}

  ngOnInit(){    
    console.log( this.taskService.getClientTaskData() );
  }

  isLoggedIn(){
    return this.loginService.isLoggedIn();
  }

  logout(){
    return this.loginService.logout();  
  }

  ngOnDestroy(){
    
  }







}
