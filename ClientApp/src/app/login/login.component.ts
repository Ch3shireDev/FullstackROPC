import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  constructor(private authService: AuthService) {
    this.username = localStorage.username;
    this.password = localStorage.password;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    localStorage.username = this.username;
    localStorage.password = this.password;
    this.authService.login(this.username, this.password);
  }


}
