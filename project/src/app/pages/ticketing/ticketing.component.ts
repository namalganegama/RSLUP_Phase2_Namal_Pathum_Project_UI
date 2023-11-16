import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticketing',
  templateUrl: './ticketing.component.html',
  styleUrls: ['./ticketing.component.scss']
})
export class TicketingComponent implements OnInit {
  ticketForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      flightname: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      price: ['', Validators.required],
      passname: ['', Validators.required],
      class: ['', Validators.required],
      ticket: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.ticketForm.value;
    console.log(formData);
    
  }

}
