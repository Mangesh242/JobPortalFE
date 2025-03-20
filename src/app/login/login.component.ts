import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { UserType } from '../utils/confirmation-dialog/UserType';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    FlexLayoutModule,
    MatSnackBarModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    debugger;
    if (this.authService.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }

  signUp(role: string) {
    if (role === UserType.INDIVIDUAL) {
      this.authService.setUserType(UserType.INDIVIDUAL);
      console.log('Sign up as Individual');
      // Add your logic for individual sign up here
      this.router.navigate(['/signup']);
    } else if (role === UserType.EMPLOYER) {
      this.authService.setUserType(UserType.EMPLOYER);
      console.log('Sign up as Employer');
      // Add your logic for employer sign up here
      this.router.navigate(['/signup']);
    }
  }
  onSubmit() {
    if (this.username && this.password) {
      this.isLoading = true;
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          console.log('Login successful', response);
          // Handle successful login, e.g., store token, redirect, etc.
          this.isLoading = false;

          this.authService.setCurrentUser(response);
          debugger;
          this.authService.setUserType(response.profileType);
          this.authService.setLoggedIn(true);
          this.router.navigate(['home']);
        },
        (error) => {
          if (error.status === 401) {
            console.error('Invalid username or password');
            this.snackBar.open('Invalid username or password', 'Close', {
              duration: 4000,
            });
          }
          console.error('Login failed', error);
          // Handle login error, e.g., show error message
          this.snackBar.open('Login failed. Please try again.', 'Close', {
            duration: 4000,
          });
          this.isLoading = false;
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
