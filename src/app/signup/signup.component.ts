import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserType } from '../utils/confirmation-dialog/UserType';
import { profile } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  username: string = '';
  password: string = '';
  name: string = '';
  email: string = '';
  role: string = '';

  profile: string = '';
  isEmployer: boolean = false;
  phone: string = '';
  company: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.profile = this.authService.getUserType;
    if (this.profile === UserType.EMPLOYER) {
      this.isEmployer = true;
    }
    console.log(this.profile);
  }

  onSubmit() {
    if (
      !this.isEmployer &&
      this.username &&
      this.password &&
      this.name &&
      this.email &&
      this.phone
    ) {
      const signupData = {
        username: this.username,
        password: this.password,
        name: this.name,
        email: this.email,
        profile: UserType.INDIVIDUAL,
        phone: this.phone,
      };

      this.authService
        .signupIndividual(
          this.username,
          this.password,
          this.name,
          this.email,
          this.phone,
          UserType.INDIVIDUAL
        )
        .subscribe((response) => {
          console.log('User signed up', response);
          alert('User signed up');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log('Error:', error);
          alert('Error signing up');
        });

      // Add your logic to handle the form submission here
      console.log('Form submitted', signupData);
    } else {
      if (
        this.username &&
        this.password &&
        this.name &&
        this.email &&
        this.phone &&
        this.company
      ) {
        const signupData = {
          username: this.username,
          password: this.password,
          name: this.name,
          email: this.email,
          profile: UserType.EMPLOYER,
          phone: this.phone,
          company: this.company,
        };
        debugger;

        this.authService
          .signupEmployer(
            this.username,
            this.password,
            this.name,
            this.email,
            UserType.EMPLOYER,
            this.company,
            this.phone
          )
          .subscribe((response) => {
            console.log('Employer signed up', response);
            alert('User signed up');
            this.router.navigate(['/login']);
          });
        // Add your logic to handle the form submission here
        console.log('Form submitted', signupData);
      }
    }
  }
}
