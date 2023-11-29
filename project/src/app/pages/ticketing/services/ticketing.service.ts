
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from './ticketing.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'http://127.0.0.1:3000/ticket';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<any> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/all`);
  }

  createTicket(ticketData: any): Observable<any> {
    const apiUrl = `${this.apiUrl}/create`;
    return this.http.post(apiUrl, ticketData);
  }

  updateTicket(ticketId: number, updatedTicketData:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${ticketId}`,updatedTicketData);
  }


  deleteTicket(ticketId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${ticketId}`);
  }
}
