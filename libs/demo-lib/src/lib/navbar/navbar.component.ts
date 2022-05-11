import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from '../auth';

@Component({
  selector: 'paychex-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.authService.logout();
  }
}

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, FlexLayoutModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarComponentModule {}
