import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/v1'; // Replace with your Spring Boot API URL

  constructor(private httpClient: HttpClient) {}
  private LoggedInStatus:boolean = false;

  setLoggedIn(value:boolean){
    this.LoggedInStatus = value;
  }

  get isLoggedIn(){
    return this.LoggedInStatus;
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/login`, {
      username,
      password,
    });
  }

  signup(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string
  ): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/signup`, {
      username,
      password,
      firstName,
      lastName,
      email,
    });
  }
  logout() {
    this.setLoggedIn(false);
    // Additional logout logic if needed, e.g., clearing tokens, etc.
  }
  
}
