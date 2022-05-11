import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  }
];

@NgModule({
  imports: [CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule, FlexLayoutModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule {}
