import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  }
];

@NgModule({
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, RouterModule.forChild(routes)],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule {}
