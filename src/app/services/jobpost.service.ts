import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobpostService {

  createJobPost(value: any) {
    return this.httpClient.post(`${this.apiUrl}/post`, value);
  }
 constructor(private httpClient: HttpClient) {}
  private apiUrl = environment.apiUrl;

  getJobPosts() {
    return this.httpClient.get(`${this.apiUrl}/post`);
  }

}
