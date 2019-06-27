import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SlideshowModule} from 'ng-simple-slideshow';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatCardModule, MatTableModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { StorageServiceModule } from 'ngx-webstorage-service';
import {MatListModule} from '@angular/material/list';

import 'hammerjs';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OtpComponent } from './otp/otp.component';
import { ReleasefundComponent } from './releasefund/releasefund.component';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { GasagencyhomeComponent } from './gasagencyhome/gasagencyhome.component';
import { GovtauthhomeComponent } from './govtauthhome/govtauthhome.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    OtpComponent,
    ReleasefundComponent,
    PlaceorderComponent,
    GasagencyhomeComponent,
    GovtauthhomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MatToolbarModule,
    BrowserAnimationsModule,
    SlideshowModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatTabsModule,
    StorageServiceModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
