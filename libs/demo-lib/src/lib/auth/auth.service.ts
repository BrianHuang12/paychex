import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, first, Observable, of, ReplaySubject } from 'rxjs';

export const AUTH_SERVICE_TOKEN = new InjectionToken<AuthService>('AUTH_SERVICE_TOKEN');

interface AuthResponse {
userId?: string,
err?: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: string | undefined = '';

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string): void {
    this.http.post<AuthResponse>('http://localhost:3334/api/users/login', {email: username, password: password}).pipe(first()).subscribe(response => {
      this.userId = response?.userId;
      if (this.userId) {
        this.isLoggedIn$.next(true);
      this.router.navigate(['/'])
      }
    });
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login'])
  }

}
