import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table'
import { AuthGuard } from '../auth';
import { MatButtonModule } from '@angular/material/button';
import { DashboardService } from './dashboard.service';
import { MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'
import { BehaviorSubject, first, switchMap, tap } from 'rxjs';

@Component({
  selector: 'paychex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  updateHandler$ = new BehaviorSubject<any>('');

  data$ = this.updateHandler$.pipe(
    switchMap(() => this.dashboardService.getLoggedInUserData().pipe(tap(s => console.log())))
  );
  displayedColumns: string[] = ['createdDate', 'closedDate', 'breaks'];

  constructor(private dashboardService: DashboardService, private snackBar: MatSnackBar) {}

  startShift(): void {
    this.dashboardService.startShift().pipe(first()).subscribe(() => {
      this.updateHandler$.next('');
    }, (err) => {
      this.snackBar.open('Cannot start a shift if one is already open.', 'Dismiss', {
        duration: 5000,
        panelClass: ['test']
      });
    })
  }

  startBreak(): void {
    this.dashboardService.startBreak().pipe(first()).subscribe(() => {
      this.updateHandler$.next('');
    }, (err) => {
      console.log(err)
      this.snackBar.open('You cannot start a break if you are not working or if you already have one open.', 'Dismiss', {
        duration: 5000,
        panelClass: ['test']
      });
    })
  }

  endShift(): void {
    this.dashboardService.endShift().pipe(first()).subscribe(() => {
      this.updateHandler$.next('');
    }, (err) => {
      this.snackBar.open('Cannot end a shift if there is no open shift', 'Dismiss', {
        duration: 5000,
        panelClass: ['test']
      });
    })
  }

  endBreak(): void {
    this.dashboardService.endBreak().pipe(first()).subscribe((test) => {
      this.updateHandler$.next('');
    }, (err) => {
      console.log(err)
      this.snackBar.open('You cannot start a break if you are not working or if you already have one open.', 'Dismiss', {
        duration: 5000,
        panelClass: ['test']
      });
    })
  }
}

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [CommonModule, MatTableModule, MatButtonModule, MatSnackBarModule, RouterModule.forChild(routes)],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
})
export class DashboardComponentModule {}
