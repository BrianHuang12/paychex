import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth';

@Component({
  selector: 'paychex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  login(): void {
    console.log(this.loginForm.get('username')?.value)
    this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
  }
}
