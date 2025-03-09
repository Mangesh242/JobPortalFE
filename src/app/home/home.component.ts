import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { JobPostsComponent } from './job-posts/job-posts.component';
import { ProfileComponent } from '../profile/profile.component';
import { JobpostService } from '../services/jobpost.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [JobPostsComponent,
    ProfileComponent,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  jobPosts:any[] = [
    
  ];
  isLoading = true;
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
}