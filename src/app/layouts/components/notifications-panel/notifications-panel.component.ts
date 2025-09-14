import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { TranslatePipe } from '../../../shared/pipes/translate/translate.pipe';

interface Notification {
  id: number;
  title: string;
  read: boolean;
  date: string;
  link: string;
}

@Component({
  selector: 'vr-notifications-panel',
  imports: [CommonModule, NzIconModule, NzDividerModule, NzPopoverModule, NzButtonModule, TranslatePipe],
  templateUrl: './notifications-panel.component.html',
  styleUrl: './notifications-panel.component.scss',
})
export class NotificationsPanelComponent implements OnInit {
  notifications = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    title: `Notification ${index + 1}`,
    read: Math.random() > 0.5,
    date: new Date().toISOString(),
    link: `/notifications/${index + 1}`,
  }));
  hasUnreadNotifications = false;

  ngOnInit(): void {
    this.setHasUnreadNotifications();
  }

  handleNotificationClick(notification: Notification): void {
    notification.read = true;
    this.setHasUnreadNotifications();
  }

  setHasUnreadNotifications(): void {
    this.hasUnreadNotifications = this.notifications.some((notification) => !notification.read);
  }
}
