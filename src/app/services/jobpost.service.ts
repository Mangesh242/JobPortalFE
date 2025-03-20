import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobpostService {
  getMyJobPosts(employerId: any) {
    return this.httpClient.get(`${this.apiUrl}/post/employer/${employerId}`);
  }

  jobApplied: any;

  saveAppliedJob(jobApplied: any) {
    this.jobApplied = jobApplied;
  }
  getAppliedJob() {
    return this.jobApplied;
  }
  
  constructor(private httpClient: HttpClient,
    private authService: AuthService
  ) {}
  
  getAppliedJobs(userId:any) {
      return this.httpClient.get(`${this.apiUrl}/applyJob/${userId}`);    
  }

  applyJob(id: any, userId: any,jobTitle:any) {
    let object={"employeeId":userId,
      "jobId":id,
      "applicationDate": Date.now(),
      "status":"Applied",
      "jobTitle":jobTitle
    };
    return this.httpClient.post(`${this.apiUrl}/applyJob`,object);
  }

  createJobPost(value: any) {
    return this.httpClient.post(`${this.apiUrl}/post`, value);
  }
 
  private apiUrl = environment.apiUrl;

  getJobPosts() {
    return this.httpClient.get(`${this.apiUrl}/post`);
  }

}
