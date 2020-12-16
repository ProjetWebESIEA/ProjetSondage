import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guard/Auth.guard';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate : [AuthGuard] },
  { path: 'home', component : HomeComponent, canActivate : [AuthGuard] },
  { path: 'createProfile', component: CreateProfileComponent },
  { path: 'monCompte', component: MonCompteComponent, canActivate : [AuthGuard] },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
