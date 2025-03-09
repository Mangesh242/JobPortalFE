import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-posts',
  imports: [NgFor, MatButtonModule],
  templateUrl: './job-posts.component.html',
  styleUrl: './job-posts.component.scss',
})
export class JobPostsComponent {
  @Input() jobPosts: any[] = [];

  constructor(private router: Router) {}

  applyJob(job: any) {
    console.log('Applying for job:', job);
    // Add your logic to handle job application here
  }
  createJobPost() {
    console.log('Creating job post');
    // Add your logic to create a job post here
    this.router.navigate(['/dashboard']);
  }
}
