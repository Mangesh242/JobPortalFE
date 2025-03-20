import { Component, OnInit } from '@angular/core';
import { JobpostService } from '../services/jobpost.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-appliedjob',
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './appliedjob.component.html',
  styleUrl: './appliedjob.component.scss'
})
export class AppliedjobComponent implements OnInit {
  constructor(private jobService: JobpostService) {
  }
  appliedJobPost:any;
  // isLoading=false;
  ngOnInit() {
    this.appliedJobPost = this.jobService.getAppliedJob();
    console.log('Applied Job:',this.appliedJobPost);
    // this.isLoading=true;
  }


}
