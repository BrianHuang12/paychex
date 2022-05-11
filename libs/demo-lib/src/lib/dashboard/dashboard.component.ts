import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table'
import { AuthGuard } from '../auth';
import { MatButtonModule } from '@angular/material/button';
import { DashboardService } from './dashboard.service';
import { shareReplay } from 'rxjs';

@Component({
  selector: 'paychex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  data$ = this.dashboardService.getLoggedInUserData().pipe(shareReplay(1));
  displayedColumns: string[] = ['createdDate', 'closedDate', 'breaks'];

  constructor(private dashboardService: DashboardService) {}

  startShift(): void {

  }

  startBreak(): void {

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
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule.forChild(routes)],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
})
export class DashboardComponentModule {}
