import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../../constants/storage-keys';
import { Theme } from '../../enums/theme.enum';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  #selectedTheme: Theme = Theme.DARK;

  constructor() {
    this.initTheme();
  }

  private initTheme() {
    let theme = localStorage.getItem(STORAGE_KEYS.THEME);

    if (theme !== Theme.LIGHT && theme !== Theme.DARK) {
      theme = Theme.DARK;
    }

    this.setTheme(theme as Theme);
  }

  setTheme(theme: Theme) {
    this.#selectedTheme = theme;
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    this.applyTheme();
  }

  private applyTheme() {
    document.documentElement.setAttribute('data-theme', this.#selectedTheme);
  }

  getSelectedTheme() {
    return this.#selectedTheme;
  }
}
