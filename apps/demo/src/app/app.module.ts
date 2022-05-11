import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DEMO_ROUTES } from './routes'
import { AppComponent } from './app.component';
import { AuthGuard, AuthService } from '@paychex/demo-lib/auth';
import { ShellLayoutComponentModule } from '@paychex/demo-lib/shell-layout'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule ,RouterModule.forRoot(DEMO_ROUTES), ShellLayoutComponentModule],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
