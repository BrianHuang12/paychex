import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DEMO_ROUTES } from './routes'
import { AppComponent } from './app.component';
import { AuthGuard, AuthService } from '@paychex/demo-lib/auth';
import { ShellLayoutComponentModule } from '@paychex/demo-lib/shell-layout'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardService } from '@paychex/demo-lib/dashboard';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule , HttpClientModule, RouterModule.forRoot(DEMO_ROUTES), ShellLayoutComponentModule],
  providers: [AuthService, AuthGuard, HttpClient, DashboardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
