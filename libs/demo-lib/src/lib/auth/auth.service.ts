import { Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

export const AUTH_SERVICE_TOKEN = new InjectionToken<AuthService>('AUTH_SERVICE_TOKEN');

@Injectable()
export class AuthService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(true);

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  constructor(private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return of(true);
  }

  logout(): void {
  }

}
