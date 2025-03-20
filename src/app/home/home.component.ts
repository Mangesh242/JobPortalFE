import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { JobPostsComponent } from './job-posts/job-posts.component';
import { ProfileComponent } from '../profile/profile.component';
import { JobpostService } from '../services/jobpost.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { AppliedjobComponent } from '../appliedjob/appliedjob.component';
import { AppliedJobsComponent } from '../applied-jobs/applied-jobs.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [JobPostsComponent,
    ProfileComponent,
    MatProgressSpinnerModule,
    CommonModule,
    AppliedJobsComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  jobPosts:any[] = [
    
  ];
  appliedJobPosts:any[] = [
  ];
  isLoading = true;
  isLoadingAppliedJobPosts = true;

  constructor(private authService: AuthService,
     private router: Router,
     private jobPostService: JobpostService) {
    console.log('HomeComponent constructor called');
    console.log('Is user logged in? ', this.authService.isLoggedIn);
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['login']);
    }

  }



  ngOnInit() {
    this.loadJobPosts();
    this.loadAppliedJobs();
  }

  loadJobPosts() {
    
    console.log("Loading job posts");
    this.jobPostService.getJobPosts().subscribe(
      (data) => {
        this.jobPosts = data as any[];
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading job posts', error);
        this.isLoading = false;
      }
    );
  }

  
    loadAppliedJobs() {
      this.isLoadingAppliedJobPosts=true;
      console.log("Loading applied jobs");
      let user=localStorage.getItem('user');
      let userId="";
      if(user){
          userId=JSON.parse(user).id;
      }
      this.jobPostService.getAppliedJobs(userId).subscribe(
        (data) => {
          console.log('Applied jobs:', data);
          this.appliedJobPosts = data as any[];

          this.isLoadingAppliedJobPosts=false;
        },
        (error) => {
          console.error('Error loading applied jobs', error);
        }
      );
    }
  

}