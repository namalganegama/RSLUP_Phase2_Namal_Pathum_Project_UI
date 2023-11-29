import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './services/passenger.interface';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { PassengerService } from './services/passenger.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {
  userForm: FormGroup;

  @ViewChild('content') content!: ElementRef;
  addForm: FormGroup;
  users: any[] = [];
  newUser: User = {} as User;
  selectedUser: User = {} as User;
  successMessage = '';
  errorMessage = '';

  constructor(private userService: PassengerService, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      id:'',
      name: '',
      email: '',
      address: '',
      city: '',
      meal:'',
      seat:'',
      request:''
      
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data.data.users;
      console.log(this.users);
    });
  }

  onSubmit() {
    const formData = this.userForm.value;
    console.log(formData);
    
  }

  editUser(user:any) {
    this.userForm.patchValue({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }

  updateUser(updatedUserData:any) {
    this.userService.updateUser(updatedUserData.id, updatedUserData)
      .subscribe(
        (response:any) => {
          console.log('User updated successfully!', response);
          this.refreshPage();
        alert('User updated successfully.');
        },
        (error:any) => {
          console.error('Error updating user:', error);
        }
      );
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user._id).subscribe(
      () => {
        this.users = this.users.filter((u) => u.id !== user._id);
        this.successMessage = 'User deleted successfully.';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        this.refreshPage();
        alert('User deleted successfully.');
      },
      (error) => {
        this.errorMessage = 'Error deleting user.';
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
      pdf.save('Passenger Data.pdf');
    });
  }
}
