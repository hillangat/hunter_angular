import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { User } from '../../beans/User';


@Component({
    moduleId: module.id,
    selector: 'app-login-component',
    templateUrl: './login-component.html',
    styleUrls: ['./login-component.css']
})

export class LoginComponent implements OnInit {

    user: User = { userName: null, password: null, firstName: null, lastName: null, key: null, roles: null };

    ngOnInit() {

    }

    login() {

    }
}
