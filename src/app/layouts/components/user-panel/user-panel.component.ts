import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../../core/auth/auth.service';
import { TranslatePipe } from '../../../shared/pipes/translate/translate.pipe';
import { UserJwt } from '../../../shared/interfaces/user.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'vr-user-panel',
  imports: [NzIconModule, NzDividerModule, NzPopoverModule, NzButtonModule, TranslatePipe],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
})
export class UserPanelComponent implements OnInit, OnDestroy {
  #authService = inject(AuthService);
  user!: UserJwt | null;
  #unsubscribe = new Subject<void>();

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.#authService.user$.pipe(takeUntil(this.#unsubscribe)).subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.#authService.logout().subscribe();
  }

  ngOnDestroy(): void {
    this.#unsubscribe.next();
    this.#unsubscribe.complete();
  }
}
