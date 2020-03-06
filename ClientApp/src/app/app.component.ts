import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  title = 'ClientApp';
  constructor(public auth: AuthService, public router: Router) {
    if (auth.isLoggedIn) {
      router.navigateByUrl('user');
    } else {
      router.navigateByUrl('login');
    }
  }


}
