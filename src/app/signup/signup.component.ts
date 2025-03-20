import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserType } from '../utils/confirmation-dialog/UserType';
import { profile } from 'console';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-signup',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  username: string = '';
  password: string = '';
  name: string = '';
  email: string = '';
  role: string = '';

  profile: string = '';
  isEmployer: boolean = false;
  phone: string = '';
  company: string = '';

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      profile: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      // role: ['', Validators.required],
      company: ['']
    });

  
  }

  ngOnInit(): void {
    this.profile = this.authService.getUserType;
    debugger;
    if (this.profile === UserType.EMPLOYER) {
      this.isEmployer = true;
      this.signupForm.controls['profile'].setValue(UserType.EMPLOYER);
    }else{
      this.signupForm.controls['profile'].setValue(UserType.INDIVIDUAL);
    }
    console.log(this.profile);



    // this.signupForm.get('role')?.valueChanges.subscribe(role => {
    //   this.isEmployer = role === UserType.EMPLOYER;
    //   if (this.isEmployer) {
    //     this.signupForm.get('company')?.setValidators([Validators.required]);
    //   } else {
    //     this.signupForm.get('company')?.clearValidators();
    //   }
    //   this.signupForm.get('company')?.updateValueAndValidity();
    // });
  }

  // onSubmit() {
  //   if (
  //     !this.isEmployer &&
  //     this.username &&
  //     this.password &&
  //     this.name &&
  //     this.email &&
  //     this.phone
  //   ) {
  //     const signupData = {
  //       username: this.username,
  //       password: this.password,
  //       name: this.name,
  //       email: this.email,
  //       profile: UserType.INDIVIDUAL,
  //       phone: this.phone,
  //     };

  //     this.authService
  //       .signupIndividual(
  //         this.username,
  //         this.password,
  //         this.name,
  //         this.email,
  //         this.phone,
  //         UserType.INDIVIDUAL
  //       )
  //       .subscribe((response) => {
  //         console.log('User signed up', response);
  //         alert('User signed up');
  //         this.router.navigate(['/login']);
  //       },
  //       (error) => {
  //         console.log('Error:', error);
  //         alert('Error signing up');
  //       });

  //     // Add your logic to handle the form submission here
  //     console.log('Form submitted', signupData);
  //   } else {
  //     if (
  //       this.username &&
  //       this.password &&
  //       this.name &&
  //       this.email &&
  //       this.phone &&
  //       this.company
  //     ) {
  //       const signupData = {
  //         username: this.username,
  //         password: this.password,
  //         name: this.name,
  //         email: this.email,
  //         profile: UserType.EMPLOYER,
  //         phone: this.phone,
  //         company: this.company,
  //       };
  //       debugger;

  //       this.authService
  //         .signupEmployer(
  //           this.username,
  //           this.password,
  //           this.name,
  //           this.email,
  //           UserType.EMPLOYER,
  //           this.company,
  //           this.phone
  //         )
  //         .subscribe((response) => {
  //           console.log('Employer signed up', response);
  //           alert('User signed up');
  //           this.router.navigate(['/login']);
  //         });
  //       // Add your logic to handle the form submission here
  //       console.log('Form submitted', signupData);
  //     }
  //   }
  // }

  onSubmitNewForm(){

    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;
      if (this.isEmployer) {
        this.authService.signupEmployer(
          signupData.username,
          signupData.password,
          signupData.name,
          signupData.email,
          UserType.EMPLOYER,
          signupData.company,
          signupData.phone
        ).subscribe(response => {
          console.log('Employer signed up', response);
          alert('User signed up');
          this.router.navigate(['/login']);
        }, error => {
          console.log('Error:', error);
          alert('Error signing up');
          this.router.navigate(['/login']);
        });
      } else {
        this.authService.signupIndividual(
          signupData.username,
          signupData.password,
          signupData.name,
          signupData.email,
          signupData.phone,
          UserType.INDIVIDUAL
        ).subscribe(response => {
          console.log('User signed up', response);
          alert('User signed up');
          this.router.navigate(['/login']);
        }, error => {
          console.log('Error:', error);
          alert('Error signing up');
          this.router.navigate(['/login']);
        });
      }
    }
  }
}
