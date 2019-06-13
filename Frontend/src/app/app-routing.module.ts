import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OtpComponent } from './otp/otp.component';
import { ReleasefundComponent } from './releasefund/releasefund.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'otp', component: OtpComponent},
  { path: 'releasefund', component:ReleasefundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
