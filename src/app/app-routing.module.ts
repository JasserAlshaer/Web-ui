import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { RegistrationComponent } from './pages/registration/registration.component';
import { ChatsComponent } from './pages/chats/chats.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },{
    path:'signup',
    component:RegistrationComponent
  },{
    path:'chats',
    component:ChatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
