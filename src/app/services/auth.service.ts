import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './../services/token.service';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `https://api.escuelajs.co/api/v1/auth`;
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  getCurrentUser() {
    const token = this.tokenService.getToken();
    if (token) {
      this.getProfile()
      .subscribe()
    }
  }

  login(email: string, password: string) {
    return this.http.post<Auth>(`https://api.escuelajs.co/api/v1/auth/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token)),
    );
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`)
    .pipe(
      tap(user => this.user.next(user))
    );
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile()),
    )
  }

  logout() {
    this.tokenService.removeToken();
    this.user.next(null);
  }
}
