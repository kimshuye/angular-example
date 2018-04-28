import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { ChooseUsernameComponent } from './choose-username/choose-username.component';

const routes: Routes = [
  {path: '' , redirectTo: '/', pathMatch: 'full'}  
  ,{path: '' , component:ChooseUsernameComponent}
  ,{path: 'userlogin' , component:UserLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
