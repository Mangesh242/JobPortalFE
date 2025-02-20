import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private authService:AuthService,private router: Router) {
    if(!this.authService.isLoggedIn){
      this.router.navigate(['login']);
    }
  }
  
  ngOnInit() {

  }

}
