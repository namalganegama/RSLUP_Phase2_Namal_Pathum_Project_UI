import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketingComponent } from './ticketing.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';

const routes: Routes = [
  {
    path: '',
    component: TicketingComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    NavbarModule
  ]
})
export class TicketingModule { }
