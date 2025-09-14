import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MenuGroup } from './interfaces/menu-item.interface';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate/translate.pipe';
import { AuthService } from '../../../core/auth/auth.service';
import { UserJwt } from '../../../shared/interfaces/user.interface';
import { MenuCategory } from '../../../shared/enums/menu-category.enum';

@Component({
  selector: 'vr-side-bar',
  imports: [CommonModule, NzIconModule, NzLayoutModule, NzButtonModule, RouterModule, TranslatePipe],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent implements OnInit, OnDestroy {
  #router = inject(Router);
  #unsubscribe = new Subject<void>();
  #authService = inject(AuthService);

  user!: UserJwt | null;
  menuGroups: MenuGroup[] = [
    {
      category: MenuCategory.GENERAL,
      categoryLabel: 'common.general',
      items: [{ icon: 'dashboard', label: 'dashboard.title', link: 'dashboard' }],
    },
    {
      category: MenuCategory.MANAGEMENT,
      categoryLabel: 'common.management',
      items: [
        { icon: 'shop', label: 'network.title', link: 'rede' },
        { icon: 'shop', label: 'store.title', link: 'loja' },
        { icon: 'apartment', label: 'pdv.title', link: 'pdv' },
      ],
    },
    {
      category: MenuCategory.SERVICES,
      categoryLabel: 'common.services',
      items: [{ icon: 'cloud-sync', label: 'update.title', link: 'atualizacao' }],
    },
    {
      category: MenuCategory.OTHERS,
      categoryLabel: 'common.others',
      items: [{ icon: 'bell', label: 'notifications.title', link: 'notificacao' }],
    },
  ];

  ngOnInit() {
    this.loadUser();
    this.watchUrl();
    this.setMenuItems(this.#router.url);
  }

  loadUser() {
    this.#authService.user$.pipe(takeUntil(this.#unsubscribe)).subscribe((user) => {
      this.user = user;
    });
  }

  watchUrl() {
    this.#router.events
      .pipe(
        takeUntil(this.#unsubscribe),
        filter((event) => event instanceof NavigationEnd),
        tap((event) => this.setMenuItems(event.url))
      )
      .subscribe();
  }

  setMenuItems(url: string) {
    this.menuGroups.forEach((menuGroup) => {
      menuGroup.items.forEach((item) => {
        item.selected = url.includes(item.link);
      });
    });
  }

  ngOnDestroy() {
    this.#unsubscribe.next();
    this.#unsubscribe.complete();
  }
}
