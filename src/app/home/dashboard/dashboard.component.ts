import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { JobpostService } from '../../services/jobpost.service';


@Component({
  selector: 'app-dashboard',
  imports: [ FormsModule,
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
      ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  jobForm: FormGroup;
  jobPosts: any[] = [];
  userId: any;

  constructor(private fb: FormBuilder,
     private router: Router,
    private jobService: JobpostService) {
    this.jobForm = this.fb.group({
      employerId: [this.userId],
      title: ['', Validators.required],
      description: ['', Validators.required],
      salaryRange: ['', Validators.required],
      location: ['', Validators.required],
      jobType: ['', Validators.required],
      id:[''],
      createDate:[''],
      category:['']
    });
  }

  
  ngOnInit(): void {
    const user=localStorage.getItem('user');
    if (user) {
      this.userId = JSON.parse(user).id;
      console.log('User Id:', this.userId);
    } else {
      // Handle the case when user is null
      this.router.navigate(['/login']);
    }
  }
  onSubmit() {
    if (this.jobForm.valid) {
      this.jobForm.value.employerId = this.userId;
      this.jobService.createJobPost(this.jobForm.value).subscribe((res) => {
        console.log('Job Post Created:', res);
      });

      debugger;
      this.jobPosts.push(this.jobForm.value);
      this.jobForm.reset();
    }
  }
}
