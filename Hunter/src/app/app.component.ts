import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from './services/tasks-service';
import { FirebaseService } from './services/firebase-service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { clients } from './data/mocked-clients';
import { LoggerService } from './common/logger.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ TasksService, FirebaseService ]
})
export class AppComponent implements OnInit, OnDestroy {

  clients: FirebaseListObservable<any[]>;

  constructor(
    private firebaseService: FirebaseService,
    private database: AngularFireDatabase,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    /* if( !this.firebaseService.isUserLoggedIn() ){
      this.firebaseService.login();
    }else{
      this.clients = this.database.list('/clients');
      if( this.clients != null ){
        this.logger.log(JSON.stringify(this.clients));
      }
    } */
  }


  isUserLoggedIn() {
    return this.firebaseService.isUserLoggedIn();
  }

  ngOnDestroy() {

  }







}
