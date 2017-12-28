import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoggerService } from '../common/logger.service';



@Injectable()

export class FirebaseService {

  user: Observable<firebase.User>;

  constructor( private afAuth: AngularFireAuth, private logger: LoggerService ) {
    this.user = afAuth.authState;
    firebase.auth().onAuthStateChanged(function(user) {
      if ( user == null ) {
        this.logger.log( 'The user has been logged out!!' );
      }
    });
  }

  login() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isUserLoggedIn() {
    return this.afAuth.auth.currentUser;
  }

  getUserFullName() {
    return this.afAuth.auth.currentUser.displayName;
  }


}
