import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from './services/ticketing.service';
import { Ticket } from './services/ticketing.interface';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ticketing',
  templateUrl: './ticketing.component.html',
  styleUrls: ['./ticketing.component.scss']
})
export class TicketingComponent implements OnInit {
  ticketForm: FormGroup;
  @ViewChild('content') content!: ElementRef;
  addForm: FormGroup;
  tickets: any[] = [];
  newUser: Ticket = {} as Ticket;
  selectedUser: Ticket = {} as Ticket;
  successMessage =  '';
  errorMessage =  '';

  constructor(private ticketService: TicketService, private formBuilder: FormBuilder) {
    this.ticketForm = this.formBuilder.group({
      id: '',
      flightname: '',
      from: '',
      to: '',
      price: '',
      passname: '',
      class: '',
      ticket: ''
    });
  }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(data => {
      this.tickets = data.data.tickets;
      console.log(this.tickets);
    });
  }

  editTicket(ticket:any) {
    this.ticketForm.patchValue({
      id: ticket._id,
      flightname: ticket.flightname,
      from: ticket.from,
      to: ticket.to,
      price: ticket.price,
      passname: ticket.passname,
      class: ticket.class,
      ticket: ticket.ticket
    });
  }

  submitForm() {
    const ticketData = this.ticketForm.value;

    if (ticketData.id) {
      this.updateTicket(ticketData);
    } else {
      this.createTicket();
    }
  }

  createTicket() {
    const formData = this.ticketForm.value;
    console.log(formData);
    this.ticketService.createTicket(formData)
      .subscribe(response => {
        this.refreshPage();
        alert('Reservation Created successfully.');
        console.log('Ticket created:', response);
      }, error => {
        console.error('Error creating reservation:', error);
      });
  }

  updateTicket(updatedTicketData:any) {
    this.ticketService.updateTicket(updatedTicketData.id, updatedTicketData)
      .subscribe(
        (response:any) => {
          console.log('Reservation updated successfully!', response);
          this.refreshPage();
        alert('Reservations updated successfully.');
        },
        (error:any) => {
          console.error('Error updating reservation:', error);
        }
      );
  }

  deleteTicket(ticket: Ticket): void {
    this.ticketService.deleteTicket(ticket._id).subscribe(
      () => {
        this.tickets = this.tickets.filter((u) => u.id !== ticket._id);
        this.successMessage = 'Resrvation deleted successfully.';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        this.refreshPage();
        alert('Reservation deleted successfully.');
      },
      (error) => {
        this.errorMessage = 'Error deleting reservation.';
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
      pdf.save('Reservation Data.pdf');
    });
  }

}
