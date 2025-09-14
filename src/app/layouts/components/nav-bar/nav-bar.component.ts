import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { UserPanelComponent } from '../user-panel/user-panel.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { NotificationsPanelComponent } from '../notifications-panel/notifications-panel.component';

@Component({
  selector: 'vr-nav-bar',
  imports: [
    NzButtonModule,
    NzIconModule,
    ThemeSelectorComponent,
    UserPanelComponent,
    NzLayoutModule,
    LanguageSelectorComponent,
    NotificationsPanelComponent,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  @Input() public = false;
  @Output() toggleSidebar = new EventEmitter<void>();
}
