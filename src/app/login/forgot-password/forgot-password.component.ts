import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [
    FormsModule,
    RouterModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    FlexLayoutModule,
    MatSnackBarModule,
    CommonModule,
    ReactiveFormsModule,
    LoginComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService,
  private snakckBar: MatSnackBar) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      console.log('Forgot Password request for email:', email);
      this.authService.setEmailAddress(email);
      // Add your logic to handle the forgot password request here
      
      debugger;
      console.log(123456);
      this.router.navigate(['/enter-otp']);
      
      //TODO: add sending OTP to email or sms step
      this.authService.sendOTP(email).subscribe((res:any) => {
        
        this.snakckBar.open('OTP sent to email', 'Close', {
          duration: 4000,
        });
        this.router.navigate(['/enter-otp']);
      },
      (error) => {
        if (error.status === 401) {
          
          this.snakckBar.open('Invalid Email. Please enter correct email.', 'Close', {
            duration: 4000,
          });
        }

    });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
