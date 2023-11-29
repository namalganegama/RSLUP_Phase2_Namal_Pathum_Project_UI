
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from './flight.interface';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private apiUrl = 'http://127.0.0.1:3000/flight';

  constructor(private http: HttpClient) {}

  getFlights(): Observable<any> {
    return this.http.get<Flight[]>(`${this.apiUrl}/all`);
  }

  createFlight(flightData: any): Observable<any> {
    const apiUrl = `${this.apiUrl}/create`;
    return this.http.post(apiUrl, flightData);
  }

  updateFlight(flightId: number, updatedFlightData:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${flightId}`,updatedFlightData);
  }


  deleteFlight(flightId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${flightId}`);
  }
}
