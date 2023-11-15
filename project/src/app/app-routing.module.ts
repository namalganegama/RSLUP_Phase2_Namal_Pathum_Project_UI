import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PassengerComponent } from './pages/passenger/passenger.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/signin/signin.module')
    .then(m => m.SigninModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module')
    .then(m => m.SigninModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module')
      .then(m => m.HomeModule)
  },
  {
    path: 'passenger',
    loadChildren: () => import('./pages/passenger/passenger.module')
      .then(m => m.PassengerModule)
  },
  {
    path: 'ticketing',
    loadChildren: () => import('./pages/ticketing/ticketing.module')
      .then(m => m.TicketingModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
