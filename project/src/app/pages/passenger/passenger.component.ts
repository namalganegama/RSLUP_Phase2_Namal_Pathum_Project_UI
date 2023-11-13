// user-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      meal: ['', Validators.required],
      seat: ['', Validators.required],
      request: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.userForm.value;
    console.log(formData);
    
  }
}
