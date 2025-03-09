import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobpostService {
 constructor(private httpClient: HttpClient) {}
  private apiUrl = 'http://localhost:8080'; // Replace with your Spring Boot API URL

  getJobPosts() {
    return this.httpClient.get(`${this.apiUrl}/post`);
  }

}
