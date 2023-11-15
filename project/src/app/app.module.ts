import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { BlankComponent } from './mocks/blank/blank.component';
import { NavbarModule } from './components/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { PassengerComponent } from './pages/passenger/passenger.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketingComponent } from './pages/ticketing/ticketing.component';


@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    PassengerComponent,
    TicketingComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,

    NavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
