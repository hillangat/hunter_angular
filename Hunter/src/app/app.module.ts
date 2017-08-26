import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { FirebaseService } from './services/firebase-service';
import { AlertService } from './services/alert-service';
import { NavbarComponent } from './components/navbar-component/navbar-component';
import { FooterComponent } from './components/footer-component/footer-component';
import { TaskGridComponent } from './components/task-grid-component/task-grid-component';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login-component/login-component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found';
import { TasksMessageComponent } from './components/task-message/task-message';
import { TaskDetailComponent } from './components/task-detail/task-detail-component';
import { TaskFieldsViewComponent } from './components/task-fields/task-fields-view';
import { TaskFieldsEditComponent } from './components/task-fields/task-fields-edit';
import { TasksGroupsComponent } from './components/task-groups/task-groups-component';
import { HunterTableConfig } from './components/hunter-table-widgets/hunter-table-config';
import { AlertComponent } from './components/alert-component/alert-component';
import { ConfirmComponent } from './components/confirm-component/confirm-component';
import { CloneTaskComponent } from './components/clone-task-component/clone-task-component';
import { ClientComponent } from './components/client-component/client-component';
import { ClickOutsideDirective } from './common/click-outside-directive';




import { ModalModule } from 'ngx-bootstrap/modal';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';


import {HttpModule} from '@angular/http';


import { AppRoutingModule }     from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { TestTaskGridComponentComponent } from './components/test-task-grid-component/test-task-grid-component.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TaskGridComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    TasksMessageComponent,
    TaskDetailComponent,
    TaskFieldsViewComponent,
    TaskFieldsEditComponent,
    TasksGroupsComponent,
    HunterTableConfig,
    AlertComponent,
    ConfirmComponent,
    CloneTaskComponent,
    ClientComponent,
    TestTaskGridComponentComponent,
    ClickOutsideDirective
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),    
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,        
    AppRoutingModule,
    HttpModule,    
    ReactiveFormsModule,    
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    DatepickerModule.forRoot()
    
  ],
  providers: [ 
    FirebaseService,
    AlertService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
