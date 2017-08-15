import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';



@Injectable()

export class FirebaseService{

  user: Observable<firebase.User>;  

  constructor(private afAuth: AngularFireAuth ) {
    this.user = afAuth.authState;    
    firebase.auth().onAuthStateChanged(function(user) {
      if( user == null ){
        console.log( "The user has been logged out!!" );
      }
    });
  }
  

  login() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isUserLoggedIn(){
    return this.afAuth.auth.currentUser;
  }

  getUserFullName(){
    return this.afAuth.auth.currentUser.displayName;
  }


}
