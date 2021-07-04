import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { landingPageKeys } from 'src/utils/landing-page-enums';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: landingPageKeys.signup,
    component: SignupComponent
  },
  {
    path: landingPageKeys.login,
    component: LoginComponent
  },
  {
    path: landingPageKeys.logout,
    component: LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
