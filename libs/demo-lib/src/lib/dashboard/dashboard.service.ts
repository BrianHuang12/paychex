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


}
