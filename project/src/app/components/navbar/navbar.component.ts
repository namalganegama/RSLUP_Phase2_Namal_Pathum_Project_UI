import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['signin']);

    this.authenticationService.logout()
      .subscribe();
  }

  goToUser() {
    this.router.navigate(['user']);
  }

  goToPassenger() {
    this.router.navigate(['passenger']);
  }

  goToTicketing() {
    this.router.navigate(['ticketing']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToFlight() {
    this.router.navigate(['flight']);
  }

}