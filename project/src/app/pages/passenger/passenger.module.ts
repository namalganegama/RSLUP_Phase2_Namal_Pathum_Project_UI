import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengerComponent } from './passenger.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';

const routes: Routes = [
  {
    path: '',
    component: PassengerComponent
  }
]

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    NavbarModule
  ]
})
export class PassengerModule { }
