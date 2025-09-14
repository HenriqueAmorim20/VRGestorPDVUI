import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';

@Component({
  selector: 'vr-public-layout',
  imports: [RouterOutlet, NzLayoutModule, NavBarComponent],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss',
})
export class PublicLayoutComponent {}
