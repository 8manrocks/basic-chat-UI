import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { landingPageKeys } from 'src/utils/landing-page-enums';

const routes: Routes = [
  {
    path: landingPageKeys.dashboard,
    loadChildren: () => import('./modules/landing-page/landing-page.module')
    .then(m => m.LandingPageModule)
  },
  {
    path: landingPageKeys.auth,
    loadChildren: () => import('./modules/auth/auth.module')
    .then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
