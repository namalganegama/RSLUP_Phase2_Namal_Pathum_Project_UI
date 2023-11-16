import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {
  flightForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.flightForm = this.fb.group({
      flightname: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      dtime: ['', Validators.required],
      atime: ['', Validators.required],
      gate: ['', Validators.required],
      assignments: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.flightForm.value;
    console.log(formData);
    
  }
}
