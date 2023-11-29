import { Component, OnInit,  ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from './services/flight.service';
import { Flight } from './services/flight.interface';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {
  flightForm: FormGroup;
  @ViewChild('content') content!: ElementRef;
  addForm: FormGroup;
  flights: any[] = [];
  newUser: Flight = {} as Flight;
  selectedUser: Flight = {} as Flight;
  successMessage = '';
  errorMessage = '';

  constructor(private flightService: FlightService, private formBuilder: FormBuilder) {
    this.flightForm = this.formBuilder.group({
      id:'',
      name:'',
      from: '',
      to: '',
      dtime: '',
      atime: '',
      gate:'',
      assignments:''
    });
  }

  ngOnInit(): void {
    this.flightService.getFlights().subscribe(data => {
      this.flights = data.data.flights;
      console.log(this.flights);
    });
  }

  
  editFlight(flight:any) {
    this.flightForm.patchValue({
      id:flight._id,
      name: flight.name,
      from: flight.from,
      to: flight.to,
      dtime: flight.dtime,
      atime: flight.atime,
      gate: flight.gate,
      assignments: flight.assignments
    });
  }

  submitForm() {
    const flightData = this.flightForm.value;

    if (flightData.id) {
      this.updateFlight(flightData);
    } else {
      this.createFlight();
    }
  }

  createFlight() {
    const formData = this.flightForm.value;
    console.log(formData);
    this.flightService.createFlight(formData)
      .subscribe(response => {
        this.refreshPage();
        alert('Flight Created successfully.');
        console.log('Flight created:', response);
      }, error => {
        console.error('Error creating flight:', error);
      });
  }

  updateFlight(updatedFlightData:any) {
    this.flightService.updateFlight(updatedFlightData.id, updatedFlightData)
      .subscribe(
        (response:any) => {
          console.log('Flight updated successfully!', response);
          this.refreshPage();
        alert('Flight updated successfully.');
        },
        (error:any) => {
          console.error('Error updating Flight:', error);
        }
      );
  }

  deleteFlight(flight: Flight): void {
    this.flightService.deleteFlight(flight._id).subscribe(
      () => {
        this.flights = this.flights.filter((u) => u.id !== flight._id);
        this.successMessage = 'Flight deleted successfully.';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        this.refreshPage();
        alert('Flight deleted successfully.');
      },
      (error) => {
        this.errorMessage = 'Error deleting flight.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }


  refreshPage(): void {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  generatePDF() {
    const content = this.content.nativeElement;

    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 0, 0, imgWidth, imgHeight);
      pdf.save('Flight Data.pdf');
    });
  }
}
