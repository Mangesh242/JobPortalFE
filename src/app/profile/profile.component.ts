import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  resumeUrl: string | ArrayBuffer | null = null;
  isLoading = true;
  username: string = '';
  email: string = '';
  phone: string = '';
  position: string = '';
  firstName: string = '';
  lastName: string = '';

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      console.log('User data:', userData);
      this.username = userData.username;
      this.email = userData.email;
      this.firstName=userData.firstName;
      this.lastName=userData.lastName;
      this.isLoading = false;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.resumeUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
