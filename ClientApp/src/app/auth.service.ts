import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get isLoggedIn() {
    return !!this.accessToken;
  }
  private url = 'http://localhost:5000/connect/token';

  private get accessToken(): string {
    return localStorage['access_token'];
  }

  private set accessToken(value: string) {
    localStorage['access_token'] = value;
  }



  constructor(public router: Router, private http: HttpClient) { }

  public login(username: string, password: string) {

    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password')
      .set('scope', 'api1')
      .set('client_id', 'client')
      .set('client_secret', 'secret');

    this.http.post(this.url, body).subscribe(res => {
      if (res['access_token']) {
        this.accessToken = res['access_token'];
        this.router.navigateByUrl('user');
      }
    });

  }

  public logout() {
    this.accessToken = '';
    this.router.navigateByUrl('/login');
  }

  public getIdentity() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${this.accessToken}` });
    return this.http.get('http://localhost:5002/identity', { headers });
  }
}
