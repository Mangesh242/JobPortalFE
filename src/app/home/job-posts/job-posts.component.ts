import { CommonModule, NgFor } from '@angular/common';
import { Component, Input,OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JobpostService } from '../../services/jobpost.service';

@Component({
  selector: 'app-job-posts',
  imports: [NgFor, MatButtonModule,CommonModule],
  templateUrl: './job-posts.component.html',
  styleUrl: './job-posts.component.scss',
})
export class JobPostsComponent implements OnInit {
  @Input() jobPosts: any[] = [];
  userType:String="";
  userId:any;


  constructor(private router: Router,private authService:AuthService,
    private jobService: JobpostService
  ) {}

  ngOnInit() {
    const user=localStorage.getItem('user');
    if (user) {
      this.userId = JSON.parse(user).id;
      console.log('User Id:', this.userId);
    } else {
      // Handle the case when user is null
      this.router.navigate(['/login']);
    }
    if(this.authService.isLoggedIn)
    {
      this.userType=this.authService.getUserType;
      console.log('User Type:',this.userType);
    }
    else{
      this.router.navigate(['/login']);
    }

  }

  applyJob(job: any) {
    debugger
    console.log('Applying for job:', job);

    this.jobService.applyJob(job.id, this.userId,job.title).subscribe((data) => {
      console.log('Job applied:', data);
      alert('Job applied successfully');
    },
    (error)=>{
      console.log('Error:',error);
      alert('Error while applying for job');
    });
    // Add your logic to handle job application here
  }
  createJobPost() {
    console.log('Creating job post');
    // Add your logic to create a job post here
    this.router.navigate(['/createjobpost']);
  }

  showJobPost(){
    console.log('Showing job post:');
    // Add your logic to show a job post here
    
  }
}
