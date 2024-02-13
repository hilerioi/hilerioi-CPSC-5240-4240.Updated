import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { TodolistsComponent } from './todolists/todolists.component';
import { TodotasksComponent } from './todotasks/todotasks.component';

const routes: Routes = [
  { path: '', component: WelcomepageComponent },
  { path: 'list', component: TodolistsComponent },
  { path: 'list/:id', component: TodotasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
