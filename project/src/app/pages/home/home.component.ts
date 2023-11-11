import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './services/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  editUser(user: User): void {
    
  }

  deleteUser(user: User): void {
  }

}