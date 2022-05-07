import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DEMO_ROUTES } from './routes'
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(DEMO_ROUTES)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
