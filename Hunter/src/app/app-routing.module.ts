import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskGridComponent } from './components/task-grid-component/task-grid-component';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login-component/login-component';
import { TasksMessageComponent } from './components/task-message/task-message';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found';
import { TaskDetailComponent } from './components/task-detail/task-detail-component';
import { ClientComponent } from './components/client-component/client-component';
import { TestTaskGridComponentComponent } from './components/test-task-grid-component/test-task-grid-component.component';
import { AnimationComponent } from './components/animation-component/animation-component';


const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'tasks',  component: TaskGridComponent },
  { path: 'home',   component: HomeComponent },
  { path: 'taskdetails/:taskId', component: TaskDetailComponent },
  { path: 'taskmessage/:taskId', component: TasksMessageComponent },
  { path: 'clients',     component: ClientComponent },
  { path: 'testtaskgrid',     component: TestTaskGridComponentComponent },
  { path: 'animation',     component: AnimationComponent },

  { path: '**',          component: PageNotFoundComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
