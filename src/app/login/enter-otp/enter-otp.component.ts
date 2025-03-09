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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-enter-otp',
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
    ReactiveFormsModule,
  ],
  templateUrl: './enter-otp.component.html',
  styleUrl: './enter-otp.component.scss',
})
export class EnterOtpComponent {
  otpForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  onSubmit() {
    if (this.otpForm.valid) {
      const otp = this.otpForm.value.otp;
      console.log('Entered OTP:', otp);
      // Add your logic to handle OTP verification here
      // this.authService.verifyOTP(otp).subscribe((res) => {
      //   console.log('OTP verified:', res);
      //   this.router.navigate(['/create-new-password']);
      // });
      if(otp === '123456') {
        this.router.navigate(['/create-new-password']);
    }
  }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}