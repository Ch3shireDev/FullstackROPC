import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  properties = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) { return; }
    this.authService.getIdentity().subscribe(res => {
      this.properties = []
      let ar = res as string[];
      ar.forEach(element => {
        let types = element.type.split('/');
        this.properties.push({ type: types[types.length - 1], value: element.value });
      });

    });

  }

  logout(): void {
    this.authService.logout();
  }

}
