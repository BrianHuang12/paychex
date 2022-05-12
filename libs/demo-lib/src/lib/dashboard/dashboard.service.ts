import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AuthService } from "../auth";
import { IUser } from "@paychex/data";

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getLoggedInUserData(): Observable<IUser> {
    return this.http.get<IUser>(`http://localhost:3334/api/users/${this.authService.userId}`).pipe(tap(s => console.log(s)));
  }

  startShift(): Observable<any> {
    return this.http.post(`http://localhost:3334/api/users/${this.authService.userId}/timecharge`, {}).pipe(tap(s => console.log(s)));
  }

  endShift(): Observable<any> {
    return this.http.patch(`http://localhost:3334/api/users/${this.authService.userId}/timecharge`, {}).pipe(tap(s => console.log(s)));
  }

  startBreak(): Observable<any> {
    return this.http.post(`http://localhost:3334/api/users/${this.authService.userId}/break`, {}, { responseType: 'text'}).pipe(tap(s => console.log(s)));
  }

  endBreak(): Observable<any> {
    return this.http.patch(`http://localhost:3334/api/users/${this.authService.userId}/break`, {}).pipe(tap(s => console.log(s)));
  }


}
