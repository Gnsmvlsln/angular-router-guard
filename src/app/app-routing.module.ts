import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserformComponent } from './userform/userform.component';
import { UsersComponent } from './users/users.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CanDeactivateGuard } from './userform/can-deactivate-guard.service';
import { UserResolver } from './users/user-resolver-service';

const routes: Routes = [
  {
    path:'',
    component: HomepageComponent
  },
  {
    path:'users/:id',
    resolve:{user: UserResolver},
    component: UsersComponent
  },
  {
    path:'user_form',
    component: UserformComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
