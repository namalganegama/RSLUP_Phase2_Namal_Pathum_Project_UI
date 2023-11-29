import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  }
]

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NavbarModule
  ]
})
export class UserModule { }
