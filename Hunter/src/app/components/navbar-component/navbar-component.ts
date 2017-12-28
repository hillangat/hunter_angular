import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase-service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  moduleId: module.id,
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.html',
  styleUrls: ['./navbar-component.css'],
  providers: [ FirebaseService ]
})

export class NavbarComponent implements OnInit {

  loggedInOutText = 'Log Out';
  private userFullName = '';

  constructor( private router: Router, private firebaseService: FirebaseService ) {
    this.loggedInOutText = 'Log Out';
  }

  public ngOnInit() {
    this.userFullName = this.firebaseService.getUserFullName();
  }

  logInOrOut() {
    this.firebaseService.logout();
  }







}
