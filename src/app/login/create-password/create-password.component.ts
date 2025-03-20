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
  selector: 'app-create-password',
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
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss',
})
export class CreateNewPasswordComponent {
  createPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService) {
    this.createPasswordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.createPasswordForm.valid) {
      const password = this.createPasswordForm.value.password;
      const user = localStorage.getItem('user');
      let email = user ? JSON.parse(user).email : null;
      if(email === null){
        email=this.authService.getEmailAddress;
        console.log("No logged in user found");
      }
      console.log('New Password:', password);
      // Add your logic to handle the password update here
      this.authService.updatePassword(email,password).subscribe((res) => {
        console.log('Password updated:', res);
        alert('Password updated successfully');
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log('Error updating password:', err);
        alert('Error updating password');
      }
      );
    }
  }

 

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
