import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userId="";

  setUserId(userId: any) {
  this.userId=userId;
  }
  get getUserId() {
    return this.userId;
  }
  private email ="";
  
  setEmailAddress(email: any) {
    this.email=email
  }
  get getEmailAddress() {
    return this.email;
  }

  
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}
  private LoggedInStatus:boolean = false;
  private userType: string = 'Ind';



  setUserType(userType: string) {
    this.userType = userType;
  }
  get getUserType() {
    return this.userType;
  }
  
  setLoggedIn(value:boolean){
    this.LoggedInStatus = value;
  }

  get isLoggedIn(){
    return this.LoggedInStatus;
  }

  sendOTP(email: any):Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/forgot-password`, {
      email 
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/login`, {
      username,
      password
    });
  }

  signupIndividual(
    username: string,
    password: string,
    name:string,
    email: string,
    phone:string,
    profile:string
  ): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/signupInd`, {
      username,
      password,
      name,
      email,
      phone,
      profile
    });
  }
  signupEmployer(
    username: string,
    password: string,
    name:string,
    email: string,
    profile: string,
    companyName: string,
    phoneNumber: string

  ): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/signupEmp`, {
      username,
      password,
     name,
     email,
     profile,
     companyName,
     phoneNumber
    });
  }
 updatePassword(password: string,email:string): Observable<any> {
  debugger
  
    return this.httpClient.post<any>(`${this.apiUrl}/update-password`, {
      email,
      password
    });
  }

  logout() {
    this.setLoggedIn(false);
    localStorage.removeItem('user');
  }
  
  setCurrentUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }
}
