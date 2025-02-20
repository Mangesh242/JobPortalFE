import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  constructor(private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (
      this.username &&
      this.password &&
      this.firstName &&
      this.lastName &&
      this.email
    ) {
      
      this.authService
        .signup(
          this.username,
          this.password,
          this.firstName,
          this.lastName,
          this.email
        )
        .subscribe(
          (response) => {
            console.log('Signup successful', response);
            // Handle successful signup, e.g., redirect to login page
            alert('Signup successful');
            this.router.navigate(['login']);

          },
          (error) => {
            console.error('Signup failed', error);
            // Handle signup error, e.g., show error message
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }
}
