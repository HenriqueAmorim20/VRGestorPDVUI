import { NzIconModule } from 'ng-zorro-antd/icon';
import { Component, OnInit } from '@angular/core';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../shared/services/theme/theme.service';
import { Theme } from '../../../shared/enums/theme.enum';

@Component({
  selector: 'vr-theme-selector',
  imports: [NzIconModule, NzSwitchModule, CommonModule, FormsModule],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss',
})
export class ThemeSelectorComponent implements OnInit {
  isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDarkMode = this.themeService.getSelectedTheme() === Theme.DARK;
  }

  onThemeChange(value: boolean) {
    this.isDarkMode = value;
    this.themeService.setTheme(this.isDarkMode ? Theme.DARK : Theme.LIGHT);
  }
}
