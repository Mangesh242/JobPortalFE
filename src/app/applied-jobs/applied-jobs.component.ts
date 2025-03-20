import { Component, Input } from '@angular/core';
import { JobpostService } from '../services/jobpost.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-applied-jobs',
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './applied-jobs.component.html',
  styleUrl: './applied-jobs.component.scss'
})
export class AppliedJobsComponent {
   @Input() appliedJobPosts: any[] = [];
  constructor(private jobService:JobpostService,private router: Router) {

  }

  ngOnInit() {
    
  }

  seeAppliedJob(jobApplied:any){
    console.log('Job Id:',jobApplied);
    this.jobService.saveAppliedJob(jobApplied);
    this.router.navigate(['/appliedjob']);
  }
  
}
