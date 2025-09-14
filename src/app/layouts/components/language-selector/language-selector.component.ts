import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { TranslateService } from '../../../shared/services/translate/translate.service';
import { Language } from '../../../shared/enums/language.enum';
import { LANGUAGE_OPTIONS } from '../../../shared/constants/language-options';

@Component({
  selector: 'vr-language-selector',
  imports: [CommonModule, NzButtonModule, NzDividerModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent implements OnInit {
  #translateService = inject(TranslateService);
  selectedLanguage!: Language;
  selectedLanguageLabel?: string;
  languages = LANGUAGE_OPTIONS;

  ngOnInit(): void {
    this.selectedLanguage = this.#translateService.getSelectedLanguage();
    this.selectedLanguageLabel = this.getSelectedLanguageLabel();
  }

  setLanguage(language: Language) {
    this.#translateService.setLanguage(language);
    this.selectedLanguage = language;
    this.selectedLanguageLabel = this.getSelectedLanguageLabel();
  }

  getSelectedLanguageLabel() {
    return this.languages.find((language) => language.value === this.selectedLanguage)?.label;
  }
}
