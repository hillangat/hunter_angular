import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()

export class FirebaseService{

  user: Observable<firebase.User>;
  isUserLoggedIn_ : boolean = false;

  constructor(private afAuth: AngularFireAuth ) {
    this.user = afAuth.authState;
    this.setUserAuthChangeListener();
  }

  setUserAuthChangeListener(){
    firebase.auth().onAuthStateChanged(function(user){
      this.isUserLoggedIn_ = user ? false:true;
    });
  }

  login() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isUserLoggedIn(){
    return firebase.auth().currentUser;
  }


}
