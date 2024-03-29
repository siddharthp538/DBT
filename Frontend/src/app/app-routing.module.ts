import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OtpComponent } from './otp/otp.component';
import { ReleasefundComponent } from './releasefund/releasefund.component';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { GasagencyhomeComponent } from './gasagencyhome/gasagencyhome.component';
import { GovtauthhomeComponent } from './govtauthhome/govtauthhome.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'otp', component: OtpComponent},
  { path: 'releasefund', component:ReleasefundComponent},
  { path: 'placeorder', component:PlaceorderComponent},
  { path: 'gasagencyhome', component:GasagencyhomeComponent},
  { path: 'govtauthhome', component: GovtauthhomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
