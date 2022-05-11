import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponentModule } from '../navbar';

@Component({
  selector: 'paychex-shell-layout',
  templateUrl: './shell-layout.component.html',
  styleUrls: ['./shell-layout.component.scss'],
})
export class ShellLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [CommonModule, RouterModule, NavbarComponentModule],
  declarations: [ShellLayoutComponent],
  exports: [ShellLayoutComponent],
})
export class ShellLayoutComponentModule {}
