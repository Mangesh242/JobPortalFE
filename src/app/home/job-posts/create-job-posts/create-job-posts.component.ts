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
import { JobpostService } from '../../../services/jobpost.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-create-job-posts',
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
          ReactiveFormsModule
  ],
  templateUrl: './create-job-posts.component.html',
  styleUrl: './create-job-posts.component.scss'
})
export class CreateJobPostsComponent {
  jobForm: FormGroup;
  jobPosts: any[] = [];
  userId: any;
  isLoading: boolean = false;
  constructor(private fb: FormBuilder,
     private router: Router,
    private jobService: JobpostService,
  private authSerivce:AuthService) {
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
    this.isLoading=true;
  
    
    const user=localStorage.getItem('user');
    if (user) {
      this.userId = JSON.parse(user).id;
      this.authSerivce.setUserId(this.userId);
      
      console.log('User Id:', this.userId);
      this.loadMyJobPosts();
    } else {
      // Handle the case when user is null
      this.router.navigate(['/login']);
    }
  }
  loadMyJobPosts() {
    this.isLoading=true;
    this.userId=this.authSerivce.getUserId;

    this.jobService.getMyJobPosts(this.userId).subscribe((res) => {
      this.jobPosts = res as any[];
      console.log('Job Posts:', this.jobPosts);
      this.isLoading=false;
    });
  }
  onSubmit() {
    if (this.jobForm.valid) {
      this.jobForm.value.employerId = this.userId;
      this.jobService.createJobPost(this.jobForm.value).subscribe((res) => {
        console.log('Job Post Created:', res);
      });
      // this.jobPosts.push(this.jobForm.value);
      this.jobForm.reset();
    }
  }
}
